"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingCart, User, Menu, X, ShoppingBag, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/", tag: "01" },
        { name: "The Menu", href: "/menu", tag: "02" },
        { name: "Market", href: "/shop", tag: "03" },
        { name: "The Lab", href: "/about", tag: "04" },
        { name: "Contact", href: "/contact", tag: "05" },
        { name: "Access", href: "/login", tag: "06" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6",
                    isScrolled ? "py-4" : "py-10"
                )}
            >
                <div className={cn(
                    "max-w-7xl mx-auto flex items-center justify-between transition-all duration-700 rounded-[2.5rem] px-8 py-3 border",
                    isScrolled
                        ? "bg-[#0a0503]/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        : "bg-transparent border-transparent"
                )}>

                    {/* Brand Sculpture */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-primary/20"
                        >
                            <Coffee size={24} />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-playfair text-2xl font-bold text-white tracking-tighter leading-none">
                                Brew<span className="text-primary italic">Haven</span>
                            </span>
                            <span className="text-[8px] font-black tracking-[0.6em] uppercase text-primary/40 leading-none mt-1">SIGNATURE SERIES</span>
                        </div>
                    </Link>

                    {/* Editorial Navigation */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group relative flex items-start gap-1"
                            >
                                <span className="text-[8px] font-black text-primary/40 mt-1 transition-all group-hover:text-primary group-hover:scale-125">{link.tag}</span>
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/40 group-hover:text-primary transition-all duration-500">
                                    {link.name}
                                </span>
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-0 h-px bg-primary opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-700"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Technical Controls */}
                    <div className="flex items-center gap-6">
                        <div className="h-6 w-px bg-white/10 hidden sm:block" />

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-accent/60 hover:text-primary transition-colors flex items-center gap-4 group"
                        >
                            <div className="relative">
                                <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                                <AnimatePresence>
                                    {totalItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-2 -right-2 bg-primary text-secondary text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                                        >
                                            {totalItems}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className="text-[10px] font-black tracking-widest uppercase hidden md:block">Protocol / {totalItems}</span>
                        </motion.button>

                        <Link href="/profile">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-accent/40 hover:text-primary transition-colors md:block hidden"
                            >
                                <User size={24} />
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="lg:hidden text-white"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={28} />
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Global "Bloom" Architecture Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 90% 5%)" }}
                        animate={{ clipPath: "circle(150% at 90% 5%)" }}
                        exit={{ clipPath: "circle(0% at 90% 5%)" }}
                        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed inset-0 z-[60] bg-[#0a0503] flex flex-col items-center justify-center grainy"
                    >
                        {/* Background Decorative Sculpture */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none font-playfair">
                            MENU
                        </div>

                        <button
                            className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-accent/20 hover:text-primary hover:border-primary transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-start gap-12 relative z-10 max-w-4xl w-full px-20">
                            <span className="text-[10px] font-black tracking-[1em] uppercase text-primary/40 block">Navigation Index</span>

                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                                    className="group flex items-end gap-10"
                                >
                                    <span className="text-xl font-black text-primary/20 mb-4 group-hover:text-primary transition-colors">{link.tag}</span>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-6xl md:text-9xl font-bold font-playfair text-white/50 hover:text-white transition-all duration-700 tracking-tighter"
                                    >
                                        {link.name}
                                    </Link>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        className="h-px bg-primary flex-1 min-w-[100px] mb-8 origin-left transition-transform duration-700"
                                    />
                                </motion.div>
                            ))}

                            {/* Bottom Menu Info */}
                            <div className="mt-20 flex gap-20 pt-12 border-t border-white/5 w-full">
                                <div className="flex items-center gap-4 text-primary">
                                    <Zap size={16} />
                                    <span className="text-[10px] font-black tracking-widest uppercase">Batch Sync Active</span>
                                </div>
                                <div className="flex items-center gap-4 text-accent/20">
                                    <ShieldCheck size={16} />
                                    <span className="text-[10px] font-black tracking-widest uppercase">Secured Session</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
