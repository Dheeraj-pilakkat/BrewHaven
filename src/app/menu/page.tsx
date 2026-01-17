"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuTabs from "@/components/MenuTabs";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Sparkles, Box } from "lucide-react";
import { useRef } from "react";

export default function MenuPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const xOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            {/* Cinematic Header */}
            <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/5">
                {/* Parallax Background Text */}
                <motion.div
                    style={{ x: xOffset }}
                    className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
                >
                    <span className="text-[20vw] font-black text-primary font-playfair">THE ARTISANAL MENU • PRIVATE RESERVE •</span>
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-8 text-primary"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Signature Selection</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-[10rem] font-bold font-playfair leading-[0.75] tracking-tighter"
                            >
                                The <span className="text-primary italic">Artisanal</span> <br />
                                Catalog.
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="lg:max-w-xs text-right"
                        >
                            <div className="flex items-center justify-end gap-4 mb-6">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest text-primary uppercase">Updated Daily</span>
                            </div>
                            <p className="text-accent/30 text-lg leading-relaxed font-inter">
                                A meticulously curated anthology of our most prestigious roasts and handcrafted laboratory pastries.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Menu Content */}
            <section className="py-24 relative">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
                <MenuTabs />
            </section>

            <Footer />
        </main>
    );
}
