"use client";

import { motion } from "framer-motion";
import { Coffee, Package, Truck, CheckCircle, Clock, Zap, ShieldCheck, MapPin, Activity, Wind, Thermometer, Droplets } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const timelineProgress = [
    { label: "ACQUISITION", status: "Completed", time: "09:12 AM" },
    { label: "THERMAL ROASTING", status: "Completed", time: "11:45 AM" },
    { label: "LOGISTICS DISPATCH", status: "Active", time: "02:20 PM" },
    { label: "FINAL DELIVERY", status: "Pending", time: "Expected 04:00 PM" },
];

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            <div className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Mission Control Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32 border-b border-white/5 pb-24">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 text-primary"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.8em] uppercase">Transmission Terminal</span>
                            </motion.div>
                            <h1 className="text-8xl md:text-[10rem] font-bold font-playfair text-white tracking-tighter leading-[0.8]">
                                Mission <br />
                                <span className="text-primary italic">Control.</span>
                            </h1>
                            <p className="text-accent/20 text-xs font-black tracking-[0.6em] uppercase mt-12">Batch ID: #BR-88219 — Priority Delta</p>
                        </div>

                        <div className="flex flex-col items-end gap-6">
                            <div className="p-8 rounded-[3rem] border border-primary/20 bg-primary/5 flex items-center gap-6 group">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-secondary shadow-[0_0_50px_rgba(212,165,116,0.2)]">
                                    <Truck size={32} />
                                </div>
                                <div>
                                    <span className="text-[8px] font-black tracking-widest text-primary uppercase block mb-1">Status Protocol</span>
                                    <h2 className="text-3xl font-bold font-playfair text-white italic">In Transit</h2>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center opacity-40">
                                <Activity size={18} className="text-primary animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Live Telemetry Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                        {/* Left: Map/Visual Simulation Overlay */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="relative aspect-video rounded-[5rem] overflow-hidden border border-white/5 bg-[#120a07] group">
                                {/* Mock Map Interface */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Pulsing Target */}
                                        <div className="w-32 h-32 rounded-full border border-primary/20 animate-ping absolute inset-0 -m-12" />
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(212,165,116,0.6)] relative z-10">
                                            <Package size={16} className="text-secondary" />
                                        </div>
                                        <div className="absolute top-12 left-12 whitespace-nowrap bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                                            <span className="text-[8px] font-black tracking-widest text-primary uppercase block mb-1">Payload Latency</span>
                                            <span className="text-sm font-bold font-mono text-white tracking-widest">45.242° N | 12.012° E</span>
                                        </div>
                                    </div>
                                </div>

                                {/* HUD Elements */}
                                <div className="absolute top-10 left-10 space-y-4">
                                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                                        <Thermometer size={14} className="text-primary" />
                                        <span className="text-[9px] font-black tracking-widest text-white uppercase">Payload Temp: 12°C</span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                                        <Droplets size={14} className="text-primary" />
                                        <span className="text-[9px] font-black tracking-widest text-white uppercase">Humidity: 45%</span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                                        <Wind size={14} className="text-primary" />
                                        <span className="text-[9px] font-black tracking-widest text-white uppercase">Vibration: Stable</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-10 right-10">
                                    <div className="flex items-center gap-4 bg-primary text-secondary p-6 rounded-3xl font-black tracking-[0.4em] uppercase text-[10px]">
                                        <MapPin size={16} /> Precision Transit Mode
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details Box */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                                <div className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-12 space-y-6">
                                    <h3 className="text-2xl font-bold font-playfair text-white italic">Consignment Details.</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-accent/20">
                                            <span>Carrier Code</span>
                                            <span className="text-white">BH-PRIORITY-AIR</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-accent/20">
                                            <span>Signature Level</span>
                                            <span className="text-primary">ULTRA-PREMIUM</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-accent/20">
                                            <span>Weight Payload</span>
                                            <span className="text-white">2.42 KG</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-12 space-y-6">
                                    <h3 className="text-2xl font-bold font-playfair text-white italic">Manifest Summary.</h3>
                                    <div className="space-y-4">
                                        <p className="text-accent/40 text-sm leading-relaxed">2x Ethiopia Aricha G1 (Reserve Roast)</p>
                                        <p className="text-accent/40 text-sm leading-relaxed">1x Precision Glassware Set</p>
                                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-primary pt-2 border-t border-white/5">Secured in Vault Case #41</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Technical Progress Timeline */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="bg-[#120a07] p-12 rounded-[5rem] border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                                <h3 className="text-3xl font-bold font-playfair text-white italic mb-16 px-4">Timeline Log.</h3>

                                <div className="space-y-12 relative pb-12">
                                    {/* Vertical Connective Line */}
                                    <div className="absolute left-7 top-0 bottom-0 w-px bg-white/5" />

                                    {timelineProgress.map((step, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-700",
                                                step.status === "Completed" ? "bg-primary text-secondary" :
                                                    step.status === "Active" ? "bg-[#120a07] border-2 border-primary text-primary" :
                                                        "bg-white/5 border border-white/10 text-accent/10"
                                            )}>
                                                {step.status === "Completed" ? <CheckCircle size={20} /> :
                                                    step.status === "Active" ? <Clock size={20} className="animate-spin-slow" /> :
                                                        <Package size={20} />}
                                            </div>
                                            <div className="space-y-1">
                                                <span className={cn(
                                                    "text-[8px] font-black tracking-widest uppercase transition-colors",
                                                    step.status === "Completed" ? "text-primary/40" :
                                                        step.status === "Active" ? "text-primary" : "text-accent/10"
                                                )}>{step.time}</span>
                                                <h4 className={cn(
                                                    "text-xl font-bold font-playfair transition-colors",
                                                    step.status !== "Pending" ? "text-white" : "text-accent/10"
                                                )}>{step.label}</h4>
                                                <p className="text-[8px] font-black tracking-[0.4em] uppercase text-accent/20 italic">{step.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Support Sculpture */}
                            <div className="p-12 rounded-[5rem] border border-white/5 bg-white/[0.02] flex flex-col items-center text-center gap-8 group cursor-pointer hover:border-primary/20 transition-all">
                                <ShieldCheck size={48} strokeWidth={1} className="text-primary group-hover:scale-110 transition-transform" />
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-bold font-playfair text-white">Secure Support.</h4>
                                    <p className="text-accent/30 text-[10px] font-black tracking-[0.4em] uppercase leading-relaxed max-w-xs">ENCRYPTED COMMS LINE 01 <br /> FOR MISSION UPDATES</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent/20 group-hover:bg-primary group-hover:text-secondary transition-all">
                                    <Zap size={20} />
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
