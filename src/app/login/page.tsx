"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Fingerprint, Lock, Mail, ArrowRight, ShieldCheck, Zap, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Surgical Simulation of Authentication Protocol
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoading(false);
        // Successful Authentication Redirect
        router.push("/profile");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="min-h-screen bg-[#0a0503] text-accent grainy flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center pt-40 pb-20 px-6 relative overflow-hidden">
                {/* Background Architectural Sculpture */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none font-playfair">
                    {isLogin ? "ENTRY" : "CREATE"}
                </div>

                {/* Left Side Decorative Teaser */}
                <div className="hidden lg:flex absolute left-20 bottom-20 flex-col gap-8 opacity-20">
                    <div className="w-px h-32 bg-primary" />
                    <span className="rotate-90 text-[8px] font-black tracking-[1.5em] uppercase text-primary whitespace-nowrap">ACCESS_RESTRICTED_PROTOCOL</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#120a07] rounded-[5rem] overflow-hidden border border-white/5 shadow-[0_0_150px_rgba(0,0,0,1)] relative z-10"
                >
                    {/* Visual Portal */}
                    <div className="relative hidden lg:block overflow-hidden bg-black">
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                        <video
                            autoPlay
                            muted
                            loop
                            className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-50 contrast-150"
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-pouring-coffee-into-a-cup-32892-large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120a07] via-transparent to-transparent" />

                        <div className="absolute bottom-20 left-20 right-20 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 text-primary"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Private Collective</span>
                            </motion.div>
                            <h2 className="text-6xl font-bold font-playfair text-white tracking-tighter leading-none">
                                The <br />
                                <span className="text-primary italic">Gathering.</span>
                            </h2>
                            <p className="text-accent/30 text-xs font-black tracking-[0.4em] uppercase leading-relaxed max-w-sm">
                                Authenticate to access your private reserve dossier and automated rituals.
                            </p>

                            <div className="flex gap-12 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-primary" />
                                    <span className="text-[8px] font-black tracking-[0.2em] text-accent/20 uppercase">SECURE_AUTH</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Zap size={16} className="text-primary" />
                                    <span className="text-[8px] font-black tracking-[0.2em] text-accent/20 uppercase">PRIORITY_LOAD</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Architecture */}
                    <div className="p-12 md:p-24 flex flex-col justify-center">
                        <div className="mb-16">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isLogin ? "login" : "register"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h1 className="text-5xl font-bold font-playfair text-white mb-4 tracking-tighter">
                                        {isLogin ? "Portal Entry." : "Join Collective."}
                                    </h1>
                                    <p className="text-accent/30 text-[10px] font-black tracking-[0.6em] uppercase">
                                        {isLogin ? "IDENTIFY YOUR COLLECTION" : "INITIATE YOUR PRIVATE ACCOUNT"}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="space-y-12 mb-16">
                                {!isLogin && (
                                    <div className="relative group">
                                        <User className="absolute left-0 top-6 text-accent/10 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="peer w-full bg-transparent border-b border-white/10 py-6 pl-10 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent"
                                            placeholder=" "
                                        />
                                        <label className="absolute left-10 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">FULL NAME</label>
                                    </div>
                                )}
                                <div className="relative group">
                                    <Mail className="absolute left-0 top-6 text-accent/10 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="peer w-full bg-transparent border-b border-white/10 py-6 pl-10 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-10 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">EMAIL ADDRESS</label>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-0 top-6 text-accent/10 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="peer w-full bg-transparent border-b border-white/10 py-6 pl-10 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-10 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">PASSWORD</label>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-24 bg-primary text-secondary rounded-[2.5rem] font-black tracking-[0.8em] uppercase text-xs flex items-center justify-center gap-8 shadow-2xl shadow-primary/20 hover:bg-white transition-all disabled:opacity-50 group"
                            >
                                {isLoading ? (
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ repeat: Infinity, delay: i * 0.1 }}
                                                className="w-2 h-2 rounded-full bg-secondary"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {isLogin ? "AUTHENTICATE" : "INITIATE ACCESS"}
                                        <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            <div className="mt-16 text-center">
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/20 hover:text-primary transition-colors"
                                >
                                    {isLogin ? "Need collective access? Join here —" : "Already a member? Return to portal —"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
