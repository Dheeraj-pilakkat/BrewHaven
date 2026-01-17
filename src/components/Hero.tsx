"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Coffee, ChevronDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <section
            ref={containerRef}
            className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0503]"
        >
            {/* Cinematic Background Image */}
            <motion.div
                style={{ y: smoothY, scale, opacity: 0.4 }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/hero.png"
                    alt="Coffee Shop"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0503]/50 to-[#0a0503]" />
            </motion.div>

            {/* Floating Elements (Coffee Beans) */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, opacity: 0, rotate: 0 }}
                        animate={{
                            y: ["0vh", "110vh"],
                            rotate: 360,
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 1.5
                        }}
                        className="absolute text-primary/30"
                        style={{
                            left: `${10 + i * 12}%`,
                            fontSize: `${20 + i * 5}px`
                        }}
                    >
                        <Coffee />
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ opacity }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-primary mx-auto mb-8"
                    />

                    <h1 className="text-7xl md:text-9xl font-bold text-accent mb-6 leading-[0.9] tracking-tighter">
                        THE ART OF <br />
                        <span className="text-primary italic font-playfair pr-4">ESPRESSO.</span>
                    </h1>

                    <p className="text-accent/60 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-inter leading-relaxed uppercase tracking-[0.2em]">
                        Premium Beans • Artisanal Roasting • Everyday Luxury
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-primary text-secondary rounded-full font-bold text-lg shadow-[0_0_30px_rgba(212,165,116,0.3)] hover:bg-accent transition-all duration-300"
                        >
                            ORDER NOW
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 text-accent font-bold group"
                        >
                            <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-secondary transition-all">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <span className="tracking-widest text-sm underline-offset-8 group-hover:underline">OUR STORY</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-accent/30 text-[10px] tracking-[0.4em] uppercase font-bold">Scroll to discover</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>

            {/* Side Label */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block z-20">
                <div className="rotate-90 origin-left text-accent/20 text-xs tracking-[1em] font-bold uppercase whitespace-nowrap">
                    ESTABLISHED 2024 — BREWHAVEN CAFE
                </div>
            </div>
        </section>
    );
}
