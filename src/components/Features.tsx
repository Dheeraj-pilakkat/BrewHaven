"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Coffee, Thermometer, Clock, Droplets, Sparkles, Box, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const bentoFeatures = [
    {
        title: "Thermal Mastery",
        desc: "Precision extraction at 92.0°C for flavor clarity that speaks for itself.",
        icon: <Thermometer className="w-8 h-8" />,
        size: "col-span-1 lg:col-span-2 row-span-1",
        tag: "STABILITY",
        color: "from-[#D4A574]/20",
        image: "/images/hero.png"
    },
    {
        title: "Micro-Lot Beans",
        desc: "Single-origin rarity in every sip.",
        icon: <Box className="w-8 h-8" />,
        size: "col-span-1 row-span-1",
        tag: "RARE",
        color: "from-blue-500/10",
        image: "/images/espresso.png"
    },
    {
        title: "20-Hour Cold Steep",
        desc: "Patience yields the smoothest finish.",
        icon: <Clock className="w-8 h-8" />,
        size: "col-span-1 row-span-1",
        tag: "PROCESS",
        color: "from-orange-500/10",
        image: "/images/cold_brew.png"
    },
    {
        title: "Reverse Osmosis",
        desc: "Because water is 98% of your coffee.",
        icon: <Droplets className="w-8 h-8" />,
        size: "col-span-1 lg:col-span-2 row-span-1",
        tag: "PURITY",
        color: "from-cyan-500/10",
        image: "/images/hero.png"
    }
];

export default function Features() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 25]);
    const yValue = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            ref={containerRef}
            className="py-40 bg-[#0a0503] text-accent relative overflow-hidden"
        >
            {/* Immersive Background Decor */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ rotate: rotateValue, y: yValue }}
                    className="absolute -top-[10%] -right-[5%] opacity-[0.03]"
                >
                    <Coffee size={800} strokeWidth={0.5} />
                </motion.div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-12 h-[1px] bg-primary" />
                            <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px]">Exceptionalism</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-7xl md:text-9xl font-bold font-playfair leading-[0.8] tracking-tighter"
                        >
                            The <span className="text-primary italic">Signature</span> <br />
                            Standard.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="lg:max-w-sm pt-8 border-t border-accent/10"
                    >
                        <p className="text-accent/40 text-lg leading-relaxed mb-8">
                            Brewing is an act of defiance against the ordinary. Every cup is
                            engineered for those who refuse to settle.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-xs font-bold tracking-widest uppercase text-accent/60">Quality Guaranteed</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bento Grid Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-40">
                    {bentoFeatures.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative rounded-[3rem] overflow-hidden bg-[#120a07] border border-white/5 p-8 lg:p-12 transition-all duration-700 hover:border-primary/50",
                                f.size
                            )}
                        >
                            {/* Background Glow */}
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-opacity duration-700", f.color)} />

                            {/* Image Preview (Visible on Hover in certain layouts) */}
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-0 group-hover:opacity-10 transition-all duration-700 scale-150 group-hover:scale-100 pointer-events-none">
                                <Image src={f.image} alt="" fill className="object-cover" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1a0f0a] text-primary flex items-center justify-center border border-white/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(212,165,116,0.2)]">
                                        {f.icon}
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-accent/20 group-hover:text-primary transition-colors"
                                    >
                                        <ArrowUpRight size={20} />
                                    </motion.div>
                                </div>

                                <div className="mt-auto">
                                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-4 block">{f.tag}</span>
                                    <h3 className="text-3xl font-bold font-playfair mb-4 text-accent group-hover:text-white transition-colors">{f.title}</h3>
                                    <p className="text-accent/40 leading-relaxed font-inter max-w-xs transition-colors group-hover:text-accent/60">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Cinematic Showcase Section */}
                <div className="relative pt-20 border-t border-accent/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative aspect-square">
                            {/* Floating Image with Parallax */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-full rounded-[4rem] overflow-hidden"
                            >
                                <Image src="/images/hero.png" alt="Process" fill className="object-cover brightness-75 transition-transform duration-[2s] hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Overlay Info */}
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-secondary flex items-center justify-center text-[10px] font-bold">BH</div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-primary">+12,000 HAPPY BREWERS</span>
                                    </div>
                                    <p className="text-2xl font-bold font-playfair text-white">"The only place that treats coffee like a high-performance engine."</p>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 blur-[100px] rounded-full" />
                        </div>

                        <div className="space-y-12">
                            <motion.h3
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-5xl md:text-7xl font-bold font-playfair leading-tight"
                            >
                                Direct Trade. <br />
                                <span className="text-primary italic">No Compromise.</span>
                            </motion.h3>

                            <p className="text-accent/50 text-xl leading-relaxed">
                                We don't work with wholesalers. We fly to the mountain side,
                                meet the farmers, and shake their hands. This is about quality
                                through transparency.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { label: "Community Support", value: "Every bag sold supports local highland schools in Ethiopia." },
                                    { label: "Sustainable Cycle", value: "Zero waste roasting process using biofuel recycled from chaff." }
                                ].map((item, i) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center gap-4 mb-2">
                                            <Zap size={18} className="text-primary" />
                                            <h4 className="font-bold text-xl tracking-tight">{item.label}</h4>
                                        </div>
                                        <p className="text-accent/30 text-sm pl-8 group-hover:text-accent/50 transition-colors">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-4 text-primary font-black tracking-[0.4em] uppercase text-xs"
                            >
                                Learn Our Method <ArrowUpRight size={16} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
