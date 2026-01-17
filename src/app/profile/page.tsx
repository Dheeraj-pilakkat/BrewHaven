"use client";

import { motion } from "framer-motion";
import { Coffee, User, Settings, ShoppingBag, Package, LogOut, ShieldCheck, Zap, Globe, Clock, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const orders = [
    { id: "BR-9921", status: "Delivered", date: "Jan 12, 2024", total: "$42.00", items: "2 signature roasts" },
    { id: "BR-8832", status: "Processing", date: "Jan 15, 2024", total: "$88.50", items: "1 reserve lot, 1 glassware" },
    { id: "BR-7712", status: "Shipped", date: "Jan 16, 2024", total: "$12.00", items: "1 custom blend" },
];

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-[#0a0503] text-accent grainy">
            <Navbar />

            <div className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Architectural Hero Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32 items-end border-b border-white/5 pb-24">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 text-primary mb-12"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Private Dossier</span>
                            </motion.div>
                            <h1 className="text-8xl md:text-[10rem] font-bold font-playfair text-white tracking-tighter leading-[0.8]">
                                David <br />
                                <span className="text-primary italic">Rossi.</span>
                            </h1>
                        </div>
                        <div className="lg:col-span-4 flex flex-col lg:items-end gap-10">
                            <div className="w-48 h-48 rounded-[4rem] overflow-hidden border border-white/10 group relative">
                                <Image src="/images/hero.png" alt="Profile" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
                                <div className="absolute inset-x-0 bottom-0 py-2 bg-primary/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[8px] font-black tracking-widest text-secondary text-center uppercase">CONNOISSEUR LEVEL</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent/20 block mb-2">Member Since</span>
                                <p className="text-xl font-bold font-playfair text-white italic">November 2023</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                        {/* Sidebar Navigation - Technical Navigation */}
                        <div className="lg:col-span-3 space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-primary/40 ml-4 pb-4 block">Navigation Index</span>
                                {[
                                    { icon: User, name: "Identity Details", active: true },
                                    { icon: ShoppingBag, name: "Acquisition History", active: false },
                                    { icon: ShieldCheck, name: "Security Gate", active: false },
                                    { icon: Settings, name: "Terminal Settings", active: false },
                                ].map((link) => (
                                    <button
                                        key={link.name}
                                        className={cn(
                                            "flex items-center gap-6 w-full p-6 rounded-[2rem] transition-all group",
                                            link.active ? "bg-primary text-secondary" : "hover:bg-white/5 text-accent/40 hover:text-white"
                                        )}
                                    >
                                        <link.icon size={20} className={cn(link.active ? "text-secondary" : "text-primary group-hover:scale-110 transition-transform")} />
                                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">{link.name}</span>
                                    </button>
                                ))}
                            </div>

                            <button className="flex items-center gap-6 w-full p-6 text-red-500/40 hover:text-red-500 transition-all mt-20 group">
                                <LogOut size={20} className="group-hover:-translate-x-2 transition-transform" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Terminate Session</span>
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-9 space-y-24">

                            {/* Technical Status Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { icon: Zap, label: "Total Volume", value: "24 Batches" },
                                    { icon: Globe, label: "Points Reserved", value: "1,240 XP" },
                                    { icon: Clock, label: "Active Rituals", value: "3 Scheduled" },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col gap-6 group hover:border-primary/30 transition-all">
                                        <stat.icon className="text-primary group-hover:animate-pulse" size={32} strokeWidth={1.5} />
                                        <div>
                                            <span className="text-[8px] font-black tracking-[0.5em] uppercase text-accent/20 block mb-1">{stat.label}</span>
                                            <p className="text-2xl font-bold font-playfair text-white">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Acquisition List - Recent Orders */}
                            <div className="space-y-12">
                                <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                    <h2 className="text-4xl font-bold font-playfair text-white italic">Recent Acquisitions.</h2>
                                    <button className="text-[10px] font-black tracking-[0.4em] uppercase text-primary flex items-center gap-3 hover:text-white transition-colors">
                                        View Archive <ArrowUpRight size={14} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 flex flex-col md:flex-row justify-between items-center gap-12 group hover:bg-white/[0.03] transition-all relative overflow-hidden">
                                            {/* Micro-glow on hover */}
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                                            <div className="flex gap-8 items-center">
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-secondary transition-all">
                                                    <Package size={24} />
                                                </div>
                                                <div>
                                                    <span className="text-[8px] font-black tracking-widest text-primary/40 uppercase mb-2 block">{order.id}</span>
                                                    <h3 className="text-2xl font-bold font-playfair text-white">{order.items}</h3>
                                                    <p className="text-accent/20 text-xs font-black tracking-widest uppercase mt-2">{order.date}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-16">
                                                <div className="text-right">
                                                    <span className="text-[8px] font-black tracking-widest text-accent/20 uppercase block mb-1">Status</span>
                                                    <span className={cn(
                                                        "text-[10px] font-black tracking-[0.4em] uppercase px-4 py-1.5 rounded-full border",
                                                        order.status === "Delivered" ? "text-green-500 border-green-500/20 bg-green-500/5" :
                                                            order.status === "Processing" ? "text-primary border-primary/20 bg-primary/5" :
                                                                "text-accent/40 border-white/5 bg-white/5"
                                                    )}>{order.status}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[8px] font-black tracking-widest text-accent/20 uppercase block mb-1">Settlement</span>
                                                    <p className="text-2xl font-bold font-playfair text-white">{order.total}</p>
                                                </div>
                                                <Link href={`/orders/${order.id}`}>
                                                    <button className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-accent/20 hover:text-primary hover:border-primary transition-all">
                                                        <ArrowUpRight size={20} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
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
