"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, CreditCard, Ship, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Zap, Box, Lock, Landmark } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
    { id: "01", name: "Manifest", icon: ShoppingBag },
    { id: "02", name: "Logistics", icon: Ship },
    { id: "03", name: "Settlement", icon: CreditCard },
];

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const containerRef = useRef(null);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleComplete = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ["#D4A574", "#FFFFFF", "#2C1810"]
            });
        }, 2500);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-[#0a0503] flex flex-col items-center justify-center p-6 grainy">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-20 rounded-[5rem] bg-[#120a07] border border-white/5 text-center max-w-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Check size={200} strokeWidth={1} />
                    </div>

                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-12 text-secondary shadow-[0_0_50px_rgba(212,165,116,0.4)]">
                        <Check size={48} />
                    </div>

                    <h1 className="text-6xl font-bold text-white mb-6 font-playfair tracking-tighter">Acquisition <span className="text-primary italic">Confirmed.</span></h1>
                    <p className="text-accent/30 text-lg mb-12 uppercase tracking-widest leading-relaxed">
                        Your signature batch has been reserved and is now entering the roasting phase. A digital dossier has been sent to your terminal.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/orders/BR-88219" className="inline-flex items-center gap-4 bg-primary text-secondary px-12 py-5 rounded-3xl font-black tracking-[0.5em] uppercase text-xs hover:bg-white transition-all">
                            Track Acquisition <Zap size={18} />
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-4 bg-white/5 border border-white/10 text-white px-12 py-5 rounded-3xl font-black tracking-[0.5em] uppercase text-xs hover:bg-white/10 transition-all">
                            Return to Lab <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            <div className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Presidential Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 border-b border-white/5 pb-20">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 text-primary mb-8"
                            >
                                <Lock size={14} />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase text-primary">Secure Checkout Protocol</span>
                            </motion.div>
                            <h1 className="text-7xl md:text-9xl font-bold font-playfair leading-[0.8] tracking-tighter text-white">
                                Finalize <br />
                                <span className="text-primary italic">Acquisition.</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-4 text-accent/20">
                            <ShieldCheck size={48} strokeWidth={1} />
                            <div className="flex flex-col items-end text-[10px] font-black tracking-[0.4em] uppercase">
                                <span>Encrypted Transaction</span>
                                <span className="text-primary">SHA-256 Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                        {/* Surgical Progress / Form Area */}
                        <div className="lg:col-span-7 space-y-20">

                            {/* Technical Indicator */}
                            <div className="flex justify-between items-center relative">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
                                {steps.map((step, i) => (
                                    <div key={step.id} className="relative group cursor-pointer" onClick={() => i < currentStep && setCurrentStep(i)}>
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                backgroundColor: i <= currentStep ? "#D4A574" : "#120a07",
                                                borderColor: i <= currentStep ? "#D4A574" : "rgba(255,255,255,0.1)",
                                                scale: i === currentStep ? 1.2 : 1
                                            }}
                                            className="w-16 h-16 rounded-[1.5rem] border flex items-center justify-center transition-all duration-700"
                                        >
                                            <step.icon size={24} className={i <= currentStep ? "text-secondary" : "text-white/20"} />
                                        </motion.div>
                                        <div className="absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            <span className={cn(
                                                "text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-500",
                                                i <= currentStep ? "text-primary" : "text-accent/10"
                                            )}>{step.id} — {step.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Form Container */}
                            <div className="bg-[#120a07] p-12 md:p-20 rounded-[5rem] border border-white/5 relative shadow-2xl overflow-hidden mt-12">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="min-h-[400px]"
                                    >
                                        {currentStep === 0 && (
                                            <div className="space-y-16">
                                                <div className="flex items-center gap-6">
                                                    <span className="text-4xl font-bold font-playfair text-white">01 /</span>
                                                    <h2 className="text-3xl font-bold font-playfair text-white italic">Identity & Access</h2>
                                                </div>
                                                <div className="space-y-12">
                                                    <div className="relative group">
                                                        <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                        <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">FULL NAME</label>
                                                    </div>
                                                    <div className="relative group">
                                                        <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                        <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">EMAIL ADDRESS</label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 1 && (
                                            <div className="space-y-16">
                                                <div className="flex items-center gap-6">
                                                    <span className="text-4xl font-bold font-playfair text-white">02 /</span>
                                                    <h2 className="text-3xl font-bold font-playfair text-white italic">Logistics Destination</h2>
                                                </div>
                                                <div className="space-y-12">
                                                    <div className="relative group">
                                                        <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                        <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">STREET ADDRESS</label>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-12">
                                                        <div className="relative group">
                                                            <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">CITY</label>
                                                        </div>
                                                        <div className="relative group">
                                                            <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">POSTAL CODE</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div className="space-y-16">
                                                <div className="flex items-center gap-6">
                                                    <span className="text-4xl font-bold font-playfair text-white">03 /</span>
                                                    <h2 className="text-3xl font-bold font-playfair text-white italic">Financial Laboratory</h2>
                                                </div>

                                                <div className="p-10 rounded-[2.5rem] border border-primary/40 bg-primary/5 flex items-center justify-between group">
                                                    <div className="flex items-center gap-6">
                                                        <Landmark className="text-primary" size={32} />
                                                        <div>
                                                            <span className="text-[10px] font-black tracking-widest text-primary uppercase block mb-1">PREFERRED GATEWAY</span>
                                                            <h4 className="text-xl font-bold font-playfair text-white">Encrypted Card Entry</h4>
                                                        </div>
                                                    </div>
                                                    <Lock className="text-primary/20" size={20} />
                                                </div>

                                                <div className="space-y-12">
                                                    <div className="relative group">
                                                        <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                        <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">CARD NUMBER</label>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-12">
                                                        <div className="relative group">
                                                            <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">EXPIRATION (MM/YY)</label>
                                                        </div>
                                                        <div className="relative group">
                                                            <input className="peer w-full bg-transparent border-b border-white/10 py-6 text-xl text-accent focus:outline-none focus:border-primary transition-all font-playfair italic placeholder:text-transparent" placeholder=" " />
                                                            <label className="absolute left-0 top-6 text-accent/20 pointer-events-none transition-all peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:font-black peer-focus:tracking-[0.4em] peer-focus:uppercase peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-black">SECURITY CODE</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex justify-between mt-24">
                                    <button
                                        onClick={handleBack}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-4 text-[10px] font-black tracking-[0.5em] uppercase text-accent/20 hover:text-primary disabled:opacity-0 transition-all group"
                                    >
                                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                                        Previous Stage
                                    </button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        className="h-20 px-12 bg-primary text-secondary rounded-[2rem] font-black tracking-[0.6em] uppercase text-xs flex items-center gap-6 shadow-2xl shadow-primary/20 hover:bg-white transition-all disabled:opacity-50"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "TRANSMITTING..." : (currentStep === steps.length - 1 ? "AUTHORIZE PURCHASE" : "PROCEED TO NEXT")}
                                        {!isProcessing && <ArrowRight size={20} />}
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Manifest / Order Summary Sculpture */}
                        <div className="lg:col-span-5">
                            <div className="bg-[#120a07] p-12 md:p-16 rounded-[4rem] border border-white/5 sticky top-40 relative overflow-hidden">
                                <div className="absolute top-0 right-10 p-4 opacity-[0.03]">
                                    <Box size={200} strokeWidth={1} />
                                </div>

                                <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
                                    <h2 className="text-3xl font-bold font-playfair text-white italic">The Manifest</h2>
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">BATCH ID: #BR882</span>
                                </div>

                                <div className="space-y-8 mb-16 max-h-[400px] overflow-y-auto pr-6 premium-scrollbar">
                                    {cart.map((item, i) => (
                                        <div key={item.id} className="flex justify-between items-start group">
                                            <div className="flex gap-6 items-center">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary font-bold">
                                                    {item.quantity}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-primary transition-colors text-lg font-playfair">{item.name}</p>
                                                    <p className="text-[10px] font-black tracking-widest text-accent/20 uppercase">Acquisition No. 0{i + 1}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-accent text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 pt-10 border-t border-white/10">
                                    <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] uppercase text-accent/20">
                                        <span>SUB-ACQUISITION TOTAL</span>
                                        <span className="text-accent underline decoration-primary/30 underline-offset-8">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] uppercase text-accent/20">
                                        <span>LOGISTICS & HANDLING</span>
                                        <span className="text-primary italic">COMPLIMENTARY</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-10">
                                        <div>
                                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-primary block mb-2">FINAL SETTLEMENT</span>
                                            <span className="text-6xl font-bold text-white font-playfair leading-none">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-accent/10">
                                            <Zap size={24} />
                                            <span className="text-[8px] font-black tracking-widest uppercase text-right">Instant Processing Secured</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Extra Trust Badges */}
                            <div className="mt-12 grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                                    <ShieldCheck size={20} className="text-primary" />
                                    <span className="text-[8px] font-black tracking-[0.3em] uppercase text-accent/40 leading-relaxed">Secured by <br /> Bio-metric SSL</span>
                                </div>
                                <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                                    <Box size={20} className="text-primary" />
                                    <span className="text-[8px] font-black tracking-[0.3em] uppercase text-accent/40 leading-relaxed">Global <br /> Priority Air</span>
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
