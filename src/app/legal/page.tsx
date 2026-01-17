"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, FileText, Scale } from "lucide-react";

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            <div className="pt-48 pb-32 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Minimalist Legal Header */}
                    <div className="mb-32 border-b border-white/5 pb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 text-primary mb-12"
                        >
                            <Scale size={16} />
                            <span className="text-[10px] font-black tracking-[0.8em] uppercase">Terms & Governance</span>
                        </motion.div>
                        <h1 className="text-8xl md:text-[10rem] font-bold font-playfair text-white tracking-tighter leading-[0.8]">
                            The <br />
                            <span className="text-primary italic">Protocol.</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                        {/* Summary Sticky Navigation */}
                        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-12">
                            <div className="space-y-6">
                                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-primary/40 block border-b border-white/5 pb-4">Index of Governance</span>
                                {[
                                    "01 / Privacy Shield",
                                    "02 / Acquisition Terms",
                                    "03 / Ritual Governance",
                                    "04 / Termination Access"
                                ].map((item) => (
                                    <button key={item} className="w-full text-left text-[10px] font-black tracking-[0.4em] uppercase text-accent/20 hover:text-primary transition-colors py-2 block">
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 space-y-6">
                                <ShieldCheck size={32} className="text-primary" />
                                <h3 className="text-xl font-bold font-playfair text-white">Encrypted Governance</h3>
                                <p className="text-accent/30 text-[10px] font-black tracking-widest uppercase leading-relaxed">YOUR DATA IS PROTECTED UNDER RSA-4096 BIT ARCHITECTURES AT ALL TIMES.</p>
                            </div>
                        </div>

                        {/* Legal Content - High Contrast Typography */}
                        <div className="lg:col-span-8 space-y-32">

                            <section className="space-y-10 group">
                                <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] flex items-center gap-4">
                                    <div className="w-8 h-px bg-primary" /> 01. Privacy Shield
                                </span>
                                <h2 className="text-5xl font-bold font-playfair text-white tracking-tight group-hover:text-primary transition-colors">Digital Identity Protection.</h2>
                                <div className="space-y-8 text-accent/40 text-lg leading-relaxed font-inter">
                                    <p>We believe your digital footprints in the BrewHaven ecosystem are a form of private art. We do not sell, rent, or lease your acquisition patterns to third-party entities. Every byte of demographic or sensory data is used exclusively to calibrate your individual coffee profile.</p>
                                    <p>We employ AES-256 bit encryption for all rest-state data and TLS 1.3 for all data-in-transit. Your biometric signatures, where provided, are never stored on our central servers; they reside exclusively within your hardware-secured enclave.</p>
                                </div>
                            </section>

                            <section className="space-y-10 group">
                                <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] flex items-center gap-4">
                                    <div className="w-8 h-px bg-primary" /> 02. Acquisition Terms
                                </span>
                                <h2 className="text-5xl font-bold font-playfair text-white tracking-tight group-hover:text-primary transition-colors">Private Property & Settlement.</h2>
                                <div className="space-y-8 text-accent/40 text-lg leading-relaxed font-inter">
                                    <p>By initiating an "Acquisition" (Purchase) on the BrewHaven terminal, you agree that sensory quality is subjective yet managed through our 12-point calibration scale. All Signature Roasts are non-refundable once the thermal seal is breached.</p>
                                    <p>Returns for hardware or un-opened lots must be initiated within 14 terminal cycles of receipt. Credits will be issued as Reserve Points or refunded to the original settlement gateway.</p>
                                </div>
                            </section>

                            <section className="space-y-10 group">
                                <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] flex items-center gap-4">
                                    <div className="w-8 h-px bg-primary" /> 03. Ritual Governance
                                </span>
                                <h2 className="text-5xl font-bold font-playfair text-white tracking-tight group-hover:text-primary transition-colors">The Brewing Conduct.</h2>
                                <div className="space-y-8 text-accent/40 text-lg leading-relaxed font-inter">
                                    <p>Access to our Proprietary Brewing Guides is granted exclusively to documented members of the Collective. Redistribution of "The Method" series is strictly prohibited under our Intellectual Heritage policy.</p>
                                </div>
                            </section>

                            {/* Contact Legal Seal */}
                            <div className="pt-20 border-t border-white/5 flex justify-between items-center opacity-20">
                                <div className="flex items-center gap-6">
                                    <Lock size={20} />
                                    <span className="text-[10px] font-black tracking-[1em] uppercase">Valid Protocol 2024</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <FileText size={20} />
                                    <span className="text-[10px] font-black tracking-[1em] uppercase">V 0.9.1 stable</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
