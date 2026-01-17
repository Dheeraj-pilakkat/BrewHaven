"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRef, useState } from "react";
import { Coffee, ShieldCheck, Zap, Globe, Star, ArrowUpRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const timeline = [
    { year: "2022", title: "The Genesis", description: "Birthed in a small garage in Douala, fueled by a singular obsession: architectural clarity in every roast." },
    { year: "2023", title: "Micro-Lot Hunt", description: "Our first expedition to the Ethiopian highlands, securing 3 exclusive micro-lots that redefined our profile." },
    { year: "2024", title: "The Obsidian Lab", description: "Inaugurated our digital-first flagship bar, blending sensory technology with ancient brewing rituals." },
    { year: "2025", title: "Signature Series", description: "Launched our global subscription model, delivering Private Reserve beans to connoisseurs in 40+ countries." },
];

const team = [
    {
        name: "Marco Rossi",
        role: "CHIEF ROASTER",
        image: "/images/hero.png",
        bio: "Obsessed with the chemical transformation of the bean at exactly 198°C."
    },
    {
        name: "Elena Gilbert",
        role: "HEAD BARISTA",
        image: "/images/espresso.png",
        bio: "A master of extraction physics, ensuring a standard deviation of 0.1g in every shot."
    },
    {
        name: "David Chen",
        role: "FOUNDER & DESIGNER",
        image: "/images/cold_brew.png",
        bio: "Architecting the intersection of premium hospitality and digital immersion."
    },
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const heroY = useTransform(scrollY, [0, 0.2], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollY, [0, 0.15], [1, 0]);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            {/* Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/hero.png"
                        alt="The Lab"
                        fill
                        className="object-cover brightness-50 contrast-125 saturate-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0503]/50 to-[#0a0503]" />
                </motion.div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex justify-center mb-12">
                            <div className="w-16 h-px bg-primary self-center" />
                            <span className="mx-6 text-[10px] font-black tracking-[0.8em] uppercase text-primary">Est. 2024</span>
                            <div className="w-16 h-px bg-primary self-center" />
                        </div>

                        <h1 className="text-8xl md:text-[12rem] font-bold font-playfair leading-[0.75] tracking-tighter mb-12">
                            The <span className="text-primary italic">Philosophy.</span>
                        </h1>

                        <p className="text-accent/30 text-xl md:text-2xl font-medium tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
                            Architecting the perfect <br /> sensory ritual.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/20">The Narrative</span>
                    <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
                </motion.div>
            </section>

            {/* Manifesto Section */}
            <section className="py-60 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-12 mb-32">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-6 mb-12"
                            >
                                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">
                                    <Zap size={20} />
                                </div>
                                <h2 className="text-primary font-black tracking-[0.6em] uppercase text-xs">Our Manifesto</h2>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-8xl font-bold font-playfair leading-tight tracking-tighter max-w-6xl"
                            >
                                We believe coffee isn't a commodity. It's a <span className="text-primary italic">scientific masterpiece</span> hiding in a simple seed. We are the architects of its release.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 space-y-12">
                            <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                <ShieldCheck className="text-primary mb-8" size={40} />
                                <h3 className="text-2xl font-bold font-playfair mb-4">Precision Standard</h3>
                                <p className="text-accent/40 text-sm leading-relaxed">Everything is measured. From the mineral content of our water to the microns of the grind.</p>
                            </div>
                            <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                <Globe className="text-primary mb-8" size={32} />
                                <h3 className="text-2xl font-bold font-playfair mb-4">Truth in Sourcing</h3>
                                <p className="text-accent/40 text-sm leading-relaxed">We skip the wholesalers. Direct-trade is our only trade. No shortcuts to quality.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-8 relative aspect-video rounded-[4rem] overflow-hidden border border-white/5">
                            <Image src="/images/pastries.png" alt="Process" fill className="object-cover brightness-50 transition-transform duration-[3s] hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] to-transparent opacity-60" />
                            <div className="absolute bottom-16 left-16">
                                <span className="text-xs font-black tracking-[0.5em] uppercase text-primary mb-4 block">Inside the Lab</span>
                                <h4 className="text-4xl font-bold font-playfair text-white">Where tradition <br /> meets tech.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Horizontal Timeline */}
            <section className="py-60 bg-white/5 border-y border-white/5 relative overflow-hidden">
                {/* Parallax Background Text */}
                <motion.div
                    style={{ x: useTransform(scrollYProgress, [0.3, 0.7], ["10%", "-10%"]) }}
                    className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
                >
                    <span className="text-[25vw] font-black text-primary font-playfair">TIMELINE • TIMELINE • TIMELINE</span>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                        <h2 className="text-7xl md:text-9xl font-bold font-playfair leading-[0.8] tracking-tighter">
                            The <span className="text-primary italic">Epic</span> <br /> Journey.
                        </h2>
                        <div className="flex items-center gap-6 text-accent/20">
                            <Trophy size={48} strokeWidth={1} />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase max-w-[100px]">AWARD WINNING INNOVATION</span>
                        </div>
                    </div>

                    <div className="flex gap-12 overflow-x-auto pb-20 premium-scrollbar snap-x">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex-none w-[350px] md:w-[450px] bg-[#120a07] p-16 rounded-[4rem] border border-white/5 snap-center transition-all duration-700 hover:border-primary/40"
                            >
                                <span className="text-primary font-black tracking-[1em] text-[40px] mb-8 block font-playfair">0{i + 1}</span>
                                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent/20 mb-4 block">{item.year}</span>
                                <h3 className="text-3xl font-bold font-playfair text-white mb-6 pr-4">{item.title}</h3>
                                <p className="text-accent/30 leading-relaxed font-inter">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Artisans Section - Editorial Grid */}
            <section className="py-60">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-32">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-4 bg-primary text-secondary px-8 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase mb-12"
                        >
                            <Star size={14} fill="currentColor" /> THE ARCHITECTS
                        </motion.div>
                        <h2 className="text-6xl md:text-9xl font-bold font-playfair leading-tight tracking-tighter">
                            Meet the <br /> <span className="text-primary italic">Artisans.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden mb-8 border border-white/10">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-all duration-[2s] group-hover:scale-110 grayscale hover:grayscale-0 brightness-[0.7] group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-80" />

                                    {/* Hover Info Overlay */}
                                    <div className="absolute inset-x-12 bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                                        <p className="text-white font-medium leading-relaxed italic text-lg pr-8">"{member.bio}"</p>
                                    </div>
                                </div>

                                <div className="px-6 flex justify-between items-end">
                                    <div>
                                        <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] mb-4 block">{member.role}</span>
                                        <h3 className="text-4xl font-bold font-playfair text-accent">{member.name}</h3>
                                    </div>
                                    <motion.div
                                        whileHover={{ rotate: 45, scale: 1.1 }}
                                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-secondary hover:border-primary transition-all"
                                    >
                                        <ArrowUpRight size={24} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - The Vault */}
            <section className="py-60 bg-[#120a07] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-5xl md:text-[7rem] font-bold font-playfair tracking-tighter mb-16">
                            Ready to experience <br />
                            the <span className="text-primary italic">Private Reserve?</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-primary text-secondary font-black tracking-[0.4em] uppercase text-xs rounded-full shadow-[0_20px_50px_rgba(212,165,116,0.3)]"
                            >
                                Explore Collection
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-12 py-6 border border-white/10 rounded-full font-black tracking-[0.4em] uppercase text-xs hover:bg-white/5 transition-colors"
                            >
                                Subcribe to Vault
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
