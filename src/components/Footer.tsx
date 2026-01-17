"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Coffee, Instagram, Twitter, Facebook, ArrowUpRight, Send, Clock, PlayCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const footerLinks = {
    shop: [
        { name: "Signature Roasts", href: "/shop" },
        { name: "Glassware", href: "/shop" },
        { name: "Equipment", href: "/shop" },
        { name: "Subscriptions", href: "/shop" },
    ],
    company: [
        { name: "The Lab", href: "/about" },
        { name: "Locations", href: "/about" },
        { name: "Ethics", href: "/legal" },
        { name: "Protocol", href: "/legal" },
        { name: "Careers", href: "/about" },
    ],
    support: [
        { name: "Brew Guides", href: "/contact" },
        { name: "Wholesale", href: "/contact" },
        { name: "Shipping", href: "/contact" },
        { name: "Contact", href: "/contact" },
    ]
};

export default function Footer() {
    const footerRef = useRef(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const xOffset = useTransform(scrollYProgress, [0.4, 1], ["20%", "-20%"]);

    return (
        <footer ref={footerRef} className="bg-[#0a0503] text-accent pt-40 pb-12 overflow-hidden border-t border-white/5 relative">

            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 w-full py-4 border-b border-white/5 bg-[#0a0503] z-20">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[9px] font-black tracking-[0.4em] uppercase">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>SYSTEMS ONLINE</span>
                        <span className="text-accent/20">|</span>
                        <span>BATCH #882: COOLING IN THE LAB</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock size={10} className="text-primary" />
                            <span>LAB TIME: {time} GMT+5:30</span>
                        </div>
                        <span className="text-accent/20">SCROLL TO APPRECIATE</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Newsletter & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-10 text-primary"
                        >
                            <div className="w-12 h-px bg-primary" />
                            <span className="text-[10px] font-black tracking-[0.6em] uppercase">Private Collective</span>
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-7xl md:text-9xl font-bold font-playfair tracking-tighter mb-16 leading-[0.8]"
                        >
                            The Ritual <br />
                            <span className="text-primary italic">Transcends.</span>
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                            <div>
                                <p className="text-accent/30 text-xl leading-relaxed font-inter mb-12">
                                    Join our inner circle for exclusive access to micro-lot
                                    harvests, architectural brewing guides, and early access
                                    to our seasonal signature roasts.
                                </p>
                                <form className="relative group">
                                    <input
                                        type="email"
                                        placeholder="JOIN THE COLLECTIVE"
                                        className="w-full bg-transparent border-b border-white/10 py-6 text-accent focus:outline-none focus:border-primary transition-all font-bold tracking-[0.4em] placeholder:text-accent/10 text-sm"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all"
                                    >
                                        <Send size={18} />
                                    </motion.button>
                                </form>
                            </div>
                            <div className="hidden md:block">
                                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 relative group">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-transparent" />
                                    <PlayCircle size={40} className="text-primary mb-6" />
                                    <h4 className="text-xl font-bold font-playfair mb-3">The BrewHaven Method</h4>
                                    <p className="text-accent/40 text-xs leading-relaxed uppercase tracking-widest">A 12-PART ARCHITECTURAL <br /> SERIES ON EXTRACTION</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-end lg:items-end">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] block">Digital Flagship</span>
                                <div className="flex gap-4">
                                    {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center text-accent/20 hover:text-primary hover:border-primary transition-all cursor-pointer"
                                        >
                                            <Icon size={24} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-12 border-t border-white/5">
                                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/20 mb-4">Official Partnerships</p>
                                <div className="flex gap-8 opacity-20 grayscale">
                                    <Coffee size={24} />
                                    <div className="w-px h-6 bg-accent" />
                                    <span className="font-bold tracking-tighter">RAINFOREST ALLIANCE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 mb-40 border-t border-white/5 pt-32">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-4 mb-10 group">
                            <div className="w-14 h-14 rounded-2xl bg-primary text-secondary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-2xl">
                                <Coffee size={28} />
                            </div>
                            <span className="text-3xl font-bold font-playfair tracking-tight">BrewHaven.</span>
                        </Link>
                        <p className="text-accent/10 text-xs leading-relaxed font-black tracking-widest uppercase mb-4">
                            DOUALA / PARIS / TOKYO
                        </p>
                        <p className="text-accent/20 text-sm leading-relaxed max-w-[200px]">
                            Crafting architectural coffee experiences since 2024.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="space-y-10">
                            <h4 className="text-primary font-black tracking-[0.6em] uppercase text-[10px]">
                                {title}
                            </h4>
                            <ul className="space-y-6">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-accent/30 hover:text-accent transition-all text-sm font-semibold flex items-center justify-between group"
                                        >
                                            <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-primary" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Brand Masterpiece Scroll */}
                <div className="border-t border-white/5 pt-20 pb-12 overflow-hidden">
                    <div className="relative">
                        <motion.div
                            style={{ x: xOffset }}
                            className="text-[20vw] font-black font-playfair tracking-tighter leading-none select-none whitespace-nowrap opacity-[0.03]"
                        >
                            BREWHAVEN CAFE — SIGNATURE SERIES — EST. 2024 — BREWHAVEN CAFE
                        </motion.div>

                        <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-center gap-8 z-10 px-4">
                            <div className="text-[10px] font-black tracking-[1em] uppercase opacity-20">
                                Brewed with Intention
                            </div>
                            <div className="flex flex-col items-end gap-2 text-[10px] font-black tracking-[0.5em] uppercase whitespace-nowrap text-right">
                                <span>ALL RIGHTS RESERVED © 2024</span>
                                <span>DESIGNED FOR THE CONNOISSEUR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative "Top" Button Sculpture */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ y: -10 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
            >
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent/20 group-hover:text-primary transition-colors">BACK TO TOP</span>
                <div className="w-px h-24 bg-gradient-to-t from-primary to-transparent" />
            </motion.button>

            {/* Background Decorative Gradient */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-primary/5 blur-[250px] rounded-full pointer-events-none" />
        </footer>
    );
}
