"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        text: "The Velvet Espresso isn't just a drink; it's a sensory encounter. The depth of flavor and the obsidian clarity of the roast is something I haven't found even in the most reclusive bars of Milan.",
        author: "Elena Moretti",
        role: "Culinary Critic, Vogue",
        rating: 5,
        tag: "CONNOISSEUR"
    },
    {
        text: "BrewHaven has managed to turn a morning habit into a high-performance ritual. Their commitment to 92°C precision is evident in every single sip. Truly the Leica of the coffee world.",
        author: "James Sterling",
        role: "Architecture Lead, Studio IX",
        rating: 5,
        tag: "CRAFTSMAN"
    },
    {
        text: "Sustainability meets absolute luxury. Knowing that my morning brew supports micro-lot farmers in Ethiopia while delivering this level of artisanal quality is why I only brew signature.",
        author: "Sarah J. Thorne",
        role: "Founder, GreenLuxe",
        rating: 5,
        tag: "SUSTAINABILITY"
    }
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 8000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)",
            scale: 1.05
        })
    };

    return (
        <section className="py-60 bg-[#faf9f6] relative overflow-hidden">
            {/* Decorative Large Quotes in Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                <span className="text-[60vw] font-black text-secondary/10">"</span>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-10 shadow-xl shadow-primary/5"
                    >
                        <Sparkles size={28} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-secondary font-playfair tracking-tighter"
                    >
                        The Anthology of <br />
                        <span className="text-primary italic">Taste.</span>
                    </motion.h2>
                </div>

                <div className="relative h-[500px] md:h-[400px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center"
                        >
                            <div className="mb-10 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-primary fill-primary" />
                                ))}
                            </div>

                            <blockquote className="text-3xl md:text-5xl font-bold text-secondary font-playfair leading-[1.2] mb-12 tracking-tight max-w-4xl">
                                "{testimonials[index].text}"
                            </blockquote>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-10 h-[1px] bg-primary/30" />
                                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">
                                        {testimonials[index].tag}
                                    </span>
                                    <div className="w-10 h-[1px] bg-primary/30" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-secondary font-inter">
                                        {testimonials[index].author}
                                    </h4>
                                    <p className="text-secondary/40 text-sm font-medium uppercase tracking-widest">
                                        {testimonials[index].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Custom Navigation Sculptures */}
                <div className="mt-24 flex items-center justify-center gap-12">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="w-14 h-14 rounded-full border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-primary hover:border-primary/50 transition-all shadow-lg bg-white"
                    >
                        <ChevronLeft size={28} />
                    </motion.button>

                    <div className="flex gap-4">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                className={cn(
                                    "h-1 px-4 rounded-full transition-all duration-700",
                                    index === i ? "bg-primary w-12" : "bg-secondary/10 hover:bg-secondary/20"
                                )}
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="w-14 h-14 rounded-full border border-secondary/5 flex items-center justify-center text-secondary/40 hover:text-primary hover:border-primary/50 transition-all shadow-lg bg-white"
                    >
                        <ChevronRight size={28} />
                    </motion.button>
                </div>
            </div>

            {/* Side Label */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden 2xl:block opacity-10">
                <div className="rotate-[-90deg] origin-left text-secondary text-[10px] font-black tracking-[1em] uppercase whitespace-nowrap">
                    VERIFIED CONNOISSEUR VOLUME — 01
                </div>
            </div>
        </section>
    );
}
