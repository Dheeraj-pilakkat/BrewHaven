"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Coffee, Flame, Droplets, Zap } from "lucide-react";

const steps = [
    {
        title: "The Selection",
        description: "We source only top-tier Arabica beans from high-altitude farms in Ethiopia and Colombia.",
        icon: <Coffee size={32} />,
        color: "#D4A574"
    },
    {
        title: "Precision Roasting",
        description: "Batch-roasted in our signature drum roaster to bring out complex notes of chocolate and citrus.",
        icon: <Flame size={32} />,
        color: "#ff6b6b"
    },
    {
        title: "Pure Extraction",
        description: "Brewed at precisely 92°C with triple-filtered mineral water for perfect clarity.",
        icon: <Droplets size={32} />,
        color: "#4dabf7"
    },
    {
        title: "The Experience",
        description: "Every cup is finished with artisanal care, ensuring a consistent premium taste every time.",
        icon: <Zap size={32} />,
        color: "#fab005"
    }
];

export default function Process() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const width = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 bg-secondary text-accent relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-bold font-playfair mb-6"
                        >
                            The Science of <br />
                            <span className="text-primary italic">Flavor.</span>
                        </motion.h2>
                        <p className="text-accent/50 text-lg leading-relaxed">
                            We've perfected every millisecond of the brewing process.
                            From the soil to your cup, precision is our only standard.
                        </p>
                    </div>
                    <div className="hidden lg:block text-right">
                        <span className="text-[120px] font-bold text-accent/5 leading-none">01—04</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-accent/10 -translate-y-1/2 hidden md:block" />
                    <motion.div
                        style={{ width }}
                        className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 hidden md:block z-10"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-20">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="flex flex-col items-center md:items-start">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-20 h-20 rounded-3xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-8 group-hover:border-primary/50 transition-colors relative transition-all duration-500"
                                    >
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 text-primary">
                                            {step.icon}
                                        </div>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-4 font-playfair">{step.title}</h3>
                                    <p className="text-accent/40 text-sm leading-relaxed text-center md:text-left">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none translate-x-1/4 translate-y-1/4">
                <Coffee size={800} />
            </div>
        </section>
    );
}
