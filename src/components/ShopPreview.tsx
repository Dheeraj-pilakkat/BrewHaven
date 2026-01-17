"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, MoveRight, Sparkles, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const previewProducts = [
    { id: 21, name: "Velvet Espresso", price: 2.99, image: "/images/espresso.png", category: "SIGNATURE", desc: "A smooth, buttery finish with notes of dark cocoa." },
    { id: 22, name: "Madagascar Latte", price: 4.99, image: "/images/hero.png", category: "CRAFTED", desc: "Infused with genuine vanilla beans from the coast." },
    { id: 23, name: "Midnight Brew", price: 4.49, image: "/images/cold_brew.png", category: "COLD", desc: "Steeped for 20 hours for an obsidian clarity." },
    { id: 24, name: "Golden Pastry", price: 3.25, image: "/images/pastries.png", category: "BAKED", desc: "Flaky artisanal layers with a honey glaze." },
];

function ProductCard({ product, index, scrollX }: { product: any; index: number; scrollX: any }) {
    const { addToCart } = useCart();
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

    function handleMouseMove(e: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative flex-none w-[340px] md:w-[450px] aspect-[4/5] rounded-[4rem] overflow-hidden bg-[#120a07] border border-white/5 transition-colors duration-700 hover:border-primary/40 cursor-none"
        >
            {/* Cinematic Main Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110 brightness-[0.7] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
            </div>

            {/* Shine Overlay */}
            <motion.div
                className="absolute inset-x-[-50%] inset-y-[-50%] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ x: useTransform(x, [-200, 200], [-50, 50]), y: useTransform(y, [-200, 200], [-50, 50]) }}
            />

            {/* Content Layers */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                <motion.div
                    className="space-y-6"
                    layout
                >
                    <div className="flex items-center gap-3">
                        <Star size={10} className="text-primary fill-primary" />
                        <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase">{product.category}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-white font-playfair leading-[1.1] transition-colors group-hover:text-primary">
                        {product.name}
                    </h3>

                    <p className="text-accent/30 text-sm leading-relaxed max-w-[80%] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        {product.desc}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-white/10 translate-y-4 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-accent/40 font-bold tracking-widest uppercase">Premium Price</span>
                            <span className="text-3xl font-bold text-accent">${product.price}</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="w-16 h-16 rounded-3xl bg-primary text-secondary flex items-center justify-center shadow-[0_20px_40px_rgba(212,165,116,0.2)] hover:bg-accent transition-all"
                        >
                            <Plus size={28} />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Hover Reveal Corner */}
            <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <Sparkles className="text-primary animate-pulse" />
            </div>

            {/* Custom Section Cursor (Internal) */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference hidden group-hover:block"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />
        </motion.div>
    );
}

export default function ShopPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scrollVelocity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const xOffset = useTransform(scrollVelocity, [0, 1], ["0%", "-20%"]);

    return (
        <section
            ref={containerRef}
            className="py-60 bg-[#0a0503] relative overflow-hidden"
        >
            {/* High-Contrast Parallax Background */}
            <motion.div
                style={{ x: xOffset }}
                className="absolute top-0 left-0 h-full flex items-center whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
            >
                <span className="text-[25vw] font-black text-primary font-playfair tracking-tighter">
                    THE ARTISANAL COLLECTION • THE ARTISANAL COLLECTION •
                </span>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end mb-32">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-6 mb-8 text-primary"
                        >
                            <div className="w-16 h-[2px] bg-primary" />
                            <span className="text-[10px] font-black tracking-[0.8em] uppercase">Private Reserve</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-8xl md:text-[10rem] font-bold text-accent font-playfair leading-[0.75] tracking-tighter"
                        >
                            Liquid <br />
                            <span className="text-primary italic">Gallery.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        className="lg:col-span-4 lg:text-right"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <p className="text-accent/40 text-lg leading-relaxed mb-12 max-w-sm ml-auto">
                            A curated anthology of our most prestigious roasts, hand-selected
                            from the world's most reclusive micro-lots.
                        </p>
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-6"
                        >
                            <span className="text-xs font-black tracking-[0.5em] uppercase text-primary border-b border-primary/20 pb-2 transition-all group-hover:border-primary group-hover:tracking-[0.7em]">
                                Discover Full Vault
                            </span>
                            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-secondary group-hover:rotate-45">
                                <MoveRight size={20} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Cinematic Horizontal Scroll */}
                <div className="relative group/scroll">
                    <div className="overflow-x-auto pb-12 premium-scrollbar flex gap-12 snap-x snap-mandatory">
                        {previewProducts.map((product, i) => (
                            <div key={product.id} className="snap-center">
                                <ProductCard product={product} index={i} scrollX={0} />
                            </div>
                        ))}

                        {/* View More Sculpture */}
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="flex-none w-[340px] md:w-[450px] aspect-[4/5] rounded-[4rem] border border-white/5 bg-[#120a07]/50 flex flex-col items-center justify-center gap-8 group cursor-pointer border-dashed hover:border-primary/40 transition-all duration-700"
                        >
                            <div className="w-32 h-32 rounded-full border border-primary/10 flex items-center justify-center relative">
                                <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                <Plus size={48} className="text-primary group-hover:rotate-180 transition-transform duration-700" />
                            </div>
                            <div className="text-center">
                                <p className="text-primary font-black tracking-[0.6em] uppercase text-[10px] mb-2">Private Access</p>
                                <h4 className="text-2xl font-bold text-accent font-playfair">Entire Vault</h4>
                            </div>
                        </motion.div>
                    </div>

                    {/* Luxury Navigation Hint */}
                    <div className="absolute left-0 bottom-10 w-full flex justify-between items-center pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-1000">
                        <div className="flex items-center gap-4 text-accent/10">
                            <span className="text-[10px] font-black tracking-widest uppercase">Scroll to pan</span>
                            <div className="w-20 h-px bg-white/5" />
                        </div>
                        <div className="flex items-center gap-4 text-accent/10">
                            <div className="w-20 h-px bg-white/5" />
                            <span className="text-[10px] font-black tracking-widest uppercase">01 / 04</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liquid Gold Ground Blur */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[200px] rounded-full" />
        </section>
    );
}
