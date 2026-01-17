"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Layers, Cpu, Database, Fingerprint, Activity, Terminal, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

function CartItem({ item, index, updateQuantity, removeFromCart }: {
    item: any;
    index: number;
    updateQuantity: (id: number, delta: number) => void;
    removeFromCart: (id: number) => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-60, 60], [5, -5]), { stiffness: 80, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-60, 60], [-5, 5]), { stiffness: 80, damping: 25 });

    function handleMouseMove(e: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            transition={{
                delay: index * 0.04,
                type: "spring",
                stiffness: 100,
                damping: 30
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1500 }}
            className="flex gap-6 p-6 md:p-8 rounded-[3rem] bg-white/[0.01] border border-white/5 group relative overflow-hidden transition-all duration-[1s] hover:border-primary/30 hover:bg-white/[0.03]"
        >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute top-6 left-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-[-5px] group-hover:translate-y-0">
                <span className="text-[7px] font-black tracking-[0.5em] text-primary/40 uppercase">LOT_{item.id % 99}</span>
            </div>

            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-[2.5rem] overflow-hidden bg-black shrink-0 border border-white/5 shadow-2xl transition-all duration-700 group-hover:shadow-primary/5">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover brightness-50 group-hover:brightness-100 group-hover:scale-110 transition-all duration-[2s] ease-[0.16,1,0.3,1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-40" />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 relative">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span className="text-primary text-[8px] font-black tracking-[0.4em] uppercase">{item.category || "PRIVATE LOT"}</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold font-playfair text-white tracking-tighter leading-none group-hover:text-primary transition-colors duration-500">
                            {item.name}
                        </h4>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/5 hover:text-red-500 transition-all p-2 rounded-full hover:bg-red-500/5 -mt-2 -mr-2"
                    >
                        <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 p-1">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(212,165,116,0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/20 hover:text-primary transition-all"
                        >
                            <Minus size={14} />
                        </motion.button>
                        <span className="w-6 text-center text-sm font-bold text-white tabular-nums">{item.quantity}</span>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(212,165,116,0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/20 hover:text-primary transition-all"
                        >
                            <Plus size={14} />
                        </motion.button>
                    </div>
                    <div className="text-right">
                        <span className="text-[8px] font-black tracking-[0.8em] uppercase text-accent/5 block mb-0.5">VALUATION</span>
                        <p className="text-xl md:text-2xl font-bold text-white font-playfair tracking-tighter">${item.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
    const [status, setStatus] = useState("Idle");

    useEffect(() => {
        if (isOpen) {
            setStatus("AUTHENTICATING...");
            const timer = setTimeout(() => setStatus("SYNCED"), 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0a0503]/90 backdrop-blur-2xl z-[100]"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 35, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-xl bg-[#0a0503] z-[110] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col border-l border-white/5 overflow-hidden"
                    >
                        <div className="absolute inset-0 grainy opacity-10 pointer-events-none" />

                        {/* Responsive Header */}
                        <div className="p-8 md:p-12 border-b border-white/5 relative z-10 shrink-0">
                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <Activity size={10} className="text-primary animate-pulse" />
                                        <span className="text-[8px] font-black tracking-[0.6em] text-primary/60 uppercase">{status}</span>
                                    </div>
                                    <h1 className="text-[10px] font-black tracking-[1em] text-white/20 uppercase">TERMINAL_08</h1>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-accent/20 hover:text-primary hover:border-primary transition-all duration-500"
                                >
                                    <X size={24} strokeWidth={1} />
                                </motion.button>
                            </div>

                            <div className="flex items-end justify-between">
                                <h2 className="text-6xl md:text-8xl font-bold font-playfair text-white tracking-tighter leading-none px-1">
                                    Your <span className="text-primary italic">Dossier.</span>
                                </h2>
                            </div>
                        </div>

                        {/* Scrollable Inventory - Scaled Spacing */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 premium-scrollbar relative">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-40 h-40 bg-white/[0.01] rounded-[4rem] border border-white/5 flex items-center justify-center mb-10 relative"
                                    >
                                        <Sparkles size={40} strokeWidth={1} className="text-primary/10" />
                                    </motion.div>
                                    <h3 className="text-4xl font-bold font-playfair text-white mb-6 italic">The Archive is Void.</h3>
                                    <p className="max-w-[280px] mx-auto text-accent/20 text-[10px] font-black tracking-[0.5em] uppercase leading-relaxed mb-12">AUTHENTICATE SENSORY ACQUISITION</p>

                                    <Link href="/shop" onClick={onClose}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="h-20 px-12 bg-primary text-secondary rounded-2xl font-black tracking-[0.6em] uppercase text-[10px] shadow-2xl hover:bg-white transition-all duration-700"
                                        >
                                            Browse Market
                                        </motion.button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-4 mb-4">
                                        <span className="text-[8px] font-black tracking-[1em] uppercase text-accent/5">Volume_Index</span>
                                        <span className="text-[8px] font-black tracking-[1em] uppercase text-accent/5">Valuation</span>
                                    </div>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {cart.map((item, i) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                index={i}
                                                updateQuantity={updateQuantity}
                                                removeFromCart={removeFromCart}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Scaled Settlement Area */}
                        {cart.length > 0 && (
                            <div className="p-8 md:p-12 bg-white/[0.03] border-t border-white/5 space-y-10 relative overflow-hidden backdrop-blur-3xl shrink-0">
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <span className="text-[8px] font-black tracking-[0.5em] uppercase text-primary/60 block mb-2">FINAL ASSESSMENT</span>
                                            <motion.div
                                                key={totalPrice}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-7xl md:text-8xl font-bold font-playfair text-white leading-none tracking-tighter"
                                            >
                                                ${totalPrice.toFixed(0)}<span className="text-3xl text-accent/20 align-top">.{(totalPrice % 1).toFixed(2).split('.')[1]}</span>
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-col items-end gap-6 text-accent/10 mb-2">
                                            <Fingerprint size={48} strokeWidth={0.5} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <Link href="/checkout" onClick={onClose}>
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="group relative w-full h-24 bg-primary text-secondary rounded-[2rem] font-black tracking-[0.8em] uppercase text-[10px] flex items-center justify-center gap-6 shadow-2xl overflow-hidden transition-all duration-700"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                            <span className="relative z-10">AUTHORIZE TRANSFER</span>
                                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-3 transition-transform duration-700" />
                                        </motion.button>
                                    </Link>

                                    <div className="flex justify-between items-center px-4">
                                        <div className="flex items-center gap-4 text-[8px] font-black tracking-[0.4em] uppercase text-accent/10">
                                            <ShieldCheck size={14} strokeWidth={1} className="text-primary" />
                                            <span>CRYPTOGRAPHIC SHIELD</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,165,116,1)]" />
                                            <span className="text-[8px] font-black tracking-[0.4em] uppercase text-primary">NODE_882</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
