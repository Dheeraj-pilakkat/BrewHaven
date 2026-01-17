"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopContent from "@/components/ShopContent";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Coffee, Search, ShoppingBag, ShieldCheck, Zap, Box } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ShopPage() {
    const containerRef = useRef(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const xOffset = useTransform(scrollY, [0, 0.4], ["0%", "-15%"]);
    const headerOpacity = useTransform(scrollY, [0, 0.2], [1, 0]);
    const headerY = useTransform(scrollY, [0, 0.2], ["0%", "20%"]);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            {/* Top Technical Status Ribbon */}
            <div className="fixed top-0 left-0 w-full z-[45] pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 pt-24 flex justify-between items-center text-[10px] font-black tracking-[0.4em] uppercase opacity-30">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span>MARKET STATUS: SYNCED</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span>SERVER TIME: {time} UTC</span>
                        <div className="w-px h-4 bg-accent/20" />
                        <span>BATCH #552: DEPARTING</span>
                    </div>
                </div>
            </div>

            {/* Cinematic Header Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Parallax Background Masterpiece */}
                <motion.div
                    style={{ x: xOffset }}
                    className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.02] select-none pointer-events-none"
                >
                    <span className="text-[25vw] font-black text-primary font-playfair">THE BREWHAVEN MARKET • SIGNATURE SERIES • EST. 2024 •</span>
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <motion.div
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="flex flex-col lg:flex-row justify-between items-end gap-16"
                    >
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-12 text-primary"
                            >
                                <div className="w-16 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.8em] uppercase">Private Reserve Inventory</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="text-8xl md:text-[14rem] font-bold font-playfair leading-[0.7] tracking-tighter"
                            >
                                The <span className="text-primary italic">Market.</span>
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="lg:max-w-sm text-right flex flex-col items-end"
                        >
                            <div className="flex items-center gap-4 mb-8 bg-white/5 px-6 py-2 rounded-full border border-white/5">
                                <ShieldCheck size={16} className="text-primary" />
                                <span className="text-[10px] font-black tracking-widest text-primary uppercase">Authenticated Original</span>
                            </div>
                            <p className="text-accent/30 text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                                An immersive flagship experience bringing surgical precision to your personal kitchen.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Sculpture Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group"
                >
                    <span className="text-[10px] font-black tracking-[0.6em] uppercase text-accent/10 group-hover:text-primary transition-colors">Enter Volume 01</span>
                    <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent" />
                </motion.div>
            </section>

            {/* Global Shopping Narrative Status */}
            <section className="py-24 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Zap size={24} />, title: "Flash Roasting", desc: "Batches roasted within 24h of order confirmation." },
                            { icon: <ShoppingBag size={24} />, title: "Secured Vault", desc: "Direct from our laboratory to your doorstep." },
                            { icon: <Box size={24} />, title: "Batch Tracking", desc: "Each item includes a signed provenance report." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center text-center p-8 rounded-[3rem] border border-white/5 bg-[#120a07]"
                            >
                                <div className="text-primary mb-6">{item.icon}</div>
                                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-white mb-2">{item.title}</h3>
                                <p className="text-accent/30 text-xs font-medium uppercase tracking-widest">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Shop Content */}
            <section className="py-24 relative min-h-screen">
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/5 blur-[300px] rounded-full pointer-events-none" />
                <ShopContent />
            </section>

            <Footer />
        </main>
    );
}
