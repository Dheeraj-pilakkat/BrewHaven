"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock, Globe, Zap, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const containerRef = useRef(null);
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

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
                <motion.div
                    style={{ x: xOffset }}
                    className="absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
                >
                    <span className="text-[20vw] font-black text-primary font-playfair">CONTACT THE LABORATORY • INQUIRIES •</span>
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-8 text-primary"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Private Communication</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-[10rem] font-bold font-playfair leading-[0.75] tracking-tighter"
                            >
                                Let's <span className="text-primary italic">Connect.</span>
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="lg:max-w-xs text-right"
                        >
                            <div className="flex items-center justify-end gap-4 mb-6 text-primary">
                                <Zap size={18} className="animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest uppercase">Fast Response Guaranteed</span>
                            </div>
                            <p className="text-accent/30 text-lg leading-relaxed font-inter">
                                Whether it's a wholesale partnership, event inquiry, or a simple greeting from a fellow connoisseur.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                        {/* Contact Details Sculpture */}
                        <div className="lg:col-span-5 space-y-24">
                            <div className="space-y-12">
                                <h3 className="text-2xl font-black tracking-[0.4em] uppercase text-primary/40 block">Foundations</h3>
                                <div className="space-y-8">
                                    {[
                                        { icon: <MapPin size={24} />, title: "HEADQUARTERS", content: "123 Coffee Lane, Obsidian Lab, BREW HAVEN" },
                                        { icon: <Phone size={24} />, title: "DIRECT LINE", content: "+1 (555) 000-1234" },
                                        { icon: <Mail size={24} />, title: "DIGITAL LOBBY", content: "concierge@brewhaven.com" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-8 group cursor-pointer"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary group-hover:border-primary transition-all duration-500">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/20 mb-2">{item.title}</h4>
                                                <p className="text-xl font-bold font-playfair group-hover:text-primary transition-colors">{item.content}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-24 border-t border-white/5">
                                <div className="bg-white/[0.02] p-12 rounded-[4rem] border border-white/5 relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Globe className="text-primary mb-8 animate-spin-slow" size={40} />
                                    <h4 className="text-3xl font-bold font-playfair mb-4">International Roasting</h4>
                                    <p className="text-accent/30 text-sm leading-relaxed mb-8 uppercase tracking-widest">WANT TO SERVE BREWHAVEN IN YOUR CITY? OUR WHOLESALE PROGRAM IS NOW OPEN FOR Q3 APPLICATIONS.</p>
                                    <button className="flex items-center gap-4 text-primary text-[10px] font-black tracking-[0.5em] uppercase hover:gap-6 transition-all">
                                        Wholesale Portal <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Premium Form */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-[#120a07] p-12 md:p-20 rounded-[5rem] border border-white/5 relative overflow-hidden shadow-2xl"
                            >
                                <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-30" />

                                <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                                    <div className="space-y-16">
                                        {/* Name */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                placeholder=" "
                                                className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-colors font-playfair italic placeholder:text-transparent"
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            />
                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase">
                                                YOUR NAME
                                            </label>
                                        </div>

                                        {/* Email */}
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                required
                                                placeholder=" "
                                                className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-colors font-playfair italic placeholder:text-transparent"
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            />
                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase">
                                                EMAIL ADDRESS
                                            </label>
                                        </div>

                                        {/* Message */}
                                        <div className="relative group">
                                            <textarea
                                                required
                                                rows={3}
                                                placeholder=" "
                                                className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-colors font-playfair italic resize-none placeholder:text-transparent"
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            />
                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black peer-[:not(:placeholder-shown)]:uppercase">
                                                YOUR INQUIRY
                                            </label>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-20 bg-primary text-secondary rounded-3xl flex items-center justify-center gap-6 text-xs font-black tracking-[0.6em] uppercase hover:bg-white transition-all shadow-[0_20px_50px_rgba(212,165,116,0.3)]"
                                    >
                                        SEND TRANSMISSION <Send size={18} />
                                    </motion.button>
                                </form>

                                {/* Success Transmission */}
                                <AnimatePresence>
                                    {isSubmitted && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="absolute inset-0 bg-primary flex flex-col items-center justify-center text-secondary z-20"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", damping: 10 }}
                                                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10"
                                            >
                                                <Send size={40} className="text-secondary" />
                                            </motion.div>
                                            <h3 className="text-5xl font-bold mb-4 font-playfair tracking-tighter">Transmission Sent.</h3>
                                            <p className="text-[10px] font-black tracking-[0.4em] uppercase">WE WILL DECODE AND REPLY WITHIN 24H.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
