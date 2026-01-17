"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const locations = [
    {
        name: "The Obsidian Lab",
        city: "DOWNTOWN",
        address: "123 Coffee Lane, Brew City",
        coords: { x: "22%", y: "45%" },
        hours: "07:00 — 21:00",
        phone: "+1 555 1234",
        desc: "Our flagship roasting facility and experimental bar."
    },
    {
        name: "Vantage Terrace",
        city: "SKYLINE",
        address: "45 Skyline Dr, High Heights",
        coords: { x: "58%", y: "28%" },
        hours: "06:00 — 20:00",
        phone: "+1 555 5678",
        desc: "Breathtaking views paired with our rarest micro-lots."
    },
    {
        name: "The Garden Glasshouse",
        city: "RIVERSIDE",
        address: "88 Bloom Way, Riverside",
        coords: { x: "72%", y: "75%" },
        hours: "08:00 — 22:00",
        phone: "+1 555 9012",
        desc: "A botanical escape in the heart of the city."
    }
];

export default function Locations() {
    const [active, setActive] = useState(0);

    return (
        <section className="py-60 bg-[#0a0503] text-accent relative overflow-hidden">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-primary" style={{ top: '25%' }} />
                <div className="absolute top-0 left-0 w-full h-px bg-primary" style={{ top: '50%' }} />
                <div className="absolute top-0 left-0 w-full h-px bg-primary" style={{ top: '75%' }} />
                <div className="absolute top-0 left-0 w-px h-full bg-primary" style={{ left: '25%' }} />
                <div className="absolute top-0 left-0 w-px h-full bg-primary" style={{ left: '50%' }} />
                <div className="absolute top-0 left-0 w-px h-full bg-primary" style={{ left: '75%' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

                    <div className="lg:col-span-5 space-y-16">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-8 text-primary"
                            >
                                <Globe size={16} />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Global Presence</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-8xl font-bold font-playfair leading-[0.8] mb-12 tracking-tighter"
                            >
                                Visit the <br />
                                <span className="text-primary italic">Signature.</span>
                            </motion.h2>

                            <p className="text-accent/30 text-lg leading-relaxed max-w-sm">
                                Each BrewHaven location is an architectural tribute to the
                                art of caffeine. Find your nearest sanctuary.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setActive(i)}
                                    className={cn(
                                        "p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500",
                                        active === i
                                            ? "border-primary bg-primary/5 shadow-[0_20px_50px_rgba(212,165,116,0.1)]"
                                            : "border-white/5 hover:border-white/10"
                                    )}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-primary text-[10px] font-black tracking-widest mb-1 block">{loc.city}</span>
                                            <h3 className="text-2xl font-bold font-playfair">{loc.name}</h3>
                                        </div>
                                        {active === i && (
                                            <motion.div
                                                layoutId="active-arrow"
                                                className="w-10 h-10 rounded-full bg-primary text-secondary flex items-center justify-center"
                                            >
                                                <ArrowRight size={20} />
                                            </motion.div>
                                        )}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {active === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-8 mt-8 border-t border-white/10 space-y-4">
                                                    <p className="text-accent/40 text-sm italic">"{loc.desc}"</p>
                                                    <div className="flex flex-wrap gap-8">
                                                        <div className="flex items-center gap-3 text-accent/60 text-xs">
                                                            <Clock size={14} className="text-primary" />
                                                            {loc.hours}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-accent/60 text-xs">
                                                            <Phone size={14} className="text-primary" />
                                                            {loc.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Abstract Dark Map */}
                    <div className="lg:col-span-7 relative aspect-square">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-full h-full bg-[#120a07] rounded-[4rem] border border-white/5 relative overflow-hidden group/map"
                        >
                            {/* Map Illustration Elements */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/40 -rotate-12" />
                                <div className="absolute top-0 left-1/3 w-[2px] h-full bg-primary/40 rotate-6" />
                                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-primary/20" />
                                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-primary/20" />

                                {/* Random Shapes representing water/parks */}
                                <div className="absolute top-1/4 left-1/4 w-40 h-20 bg-primary/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-1/3 right-1/4 w-60 h-40 bg-primary/5 rounded-full blur-[100px]" />
                            </div>

                            {/* Glowing Pulse for Active */}
                            <AnimatePresence>
                                <motion.div
                                    key={active}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 0.2 }}
                                    exit={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute w-40 h-40 bg-primary rounded-full blur-3xl z-0"
                                    style={{ left: `calc(${locations[active].coords.x} - 80px)`, top: `calc(${locations[active].coords.y} - 80px)` }}
                                />
                            </AnimatePresence>

                            {/* Markers */}
                            {locations.map((loc, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="absolute z-20"
                                    style={{ left: loc.coords.x, top: loc.coords.y }}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <div className="relative">
                                        <motion.div
                                            animate={active === i ? { scale: [1, 1.3, 1] } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                                active === i
                                                    ? "bg-primary text-secondary shadow-[0_0_30px_rgba(212,165,116,0.4)] scale-125 rotate-45"
                                                    : "bg-secondary border border-white/10 text-primary hover:border-primary/50"
                                            )}
                                        >
                                            <MapPin size={22} className={active === i ? "-rotate-45" : ""} />
                                        </motion.div>

                                        {/* Hover Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/map:opacity-100 transition-opacity">
                                            <span className="bg-secondary text-primary px-3 py-1 rounded-lg text-[10px] font-black whitespace-nowrap border border-white/10 shadow-xl">
                                                {loc.name}
                                            </span>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}

                            {/* Bottom Info HUD */}
                            <div className="absolute bottom-12 left-12 right-12 z-30">
                                <div className="bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-2xl font-bold font-playfair">{locations[active].name}</h4>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-6 py-2 bg-primary text-secondary rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-accent transition-colors"
                                        >
                                            Navigatge
                                        </motion.button>
                                    </div>
                                    <div className="flex items-center gap-6 text-accent/40 text-xs">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-primary" />
                                            {locations[active].address}
                                        </div>
                                        <div className="h-4 w-px bg-white/10" />
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-primary" />
                                            {locations[active].hours}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
