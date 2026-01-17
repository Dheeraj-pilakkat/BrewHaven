"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Info, Plus, Star, Sparkles, Thermometer, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const categories = ["Espresso", "Brewed", "Cold", "Pastries"];

const menuItems = [
    { id: 1, name: "Velvet Espresso", price: 2.99, category: "Espresso", image: "/images/espresso.png", calories: 5, description: "Pure obsidian extraction with a dense, buttery crema.", temp: "92.0°C", origin: "Ethiopia" },
    { id: 2, name: "Double Macchiato", price: 3.49, category: "Espresso", image: "/images/espresso.png", calories: 15, description: "Precision-stained double shot with micro-foam.", temp: "92.0°C", origin: "Colombia" },
    { id: 3, name: "Madagascar Latte", price: 4.99, category: "Espresso", image: "/images/hero.png", calories: 250, description: "Velvety steamed milk with authentic vanilla bean.", temp: "65.5°C", origin: "Multiple" },
    { id: 4, name: "Private Blend", price: 2.49, category: "Brewed", image: "/images/hero.png", calories: 2, description: "Medium-dark roast with notes of dark chocolate.", temp: "94.0°C", origin: "Guatemala" },
    { id: 5, name: "Obsidian Cold", price: 4.49, category: "Cold", image: "/images/cold_brew.png", calories: 5, description: "20-hour steeped micro-lot for absolute clarity.", temp: "4.0°C", origin: "Kenya" },
    { id: 6, name: "Golden Croissant", price: 3.25, category: "Pastries", image: "/images/pastries.png", calories: 280, description: "96 layers of artisanal French butter pastry.", temp: "Warm", origin: "Bakery" },
];

function MenuItemCard({ item, index }: { item: any; index: number }) {
    const { addToCart } = useCart();
    const cardRef = useRef<HTMLDivElement>(null);
    const [showInfo, setShowInfo] = useState(false);

    // 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setShowInfo(false);
    }

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative bg-[#120a07] rounded-[3.5rem] p-4 border border-white/5 transition-all duration-700 hover:border-primary/40 overflow-hidden"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([xValue, yValue]) => `radial-gradient(400px circle at ${xValue}px ${yValue}px, rgba(212,165,116,0.15), transparent 80%)`
                    ),
                }}
            />

            {/* Main Image Container */}
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-black/40">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a07] via-transparent to-transparent opacity-60" />

                {/* Info Toggle Overlay */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            className="absolute inset-0 bg-secondary/80 flex flex-col items-center justify-center p-10 text-center z-20"
                        >
                            <div className="space-y-6">
                                <div className="flex flex-col items-center gap-2">
                                    <Thermometer size={16} className="text-primary" />
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">Calibration: {item.temp}</span>
                                </div>
                                <div className="h-px w-12 bg-primary/20 mx-auto" />
                                <p className="text-accent/80 text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                                <div className="text-[10px] font-black tracking-widest text-accent/20 uppercase">
                                    ORIGIN: {item.origin}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Trigger */}
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent/40 backdrop-blur-md z-30 transition-all hover:bg-primary hover:text-secondary hover:border-primary"
                >
                    <Info size={18} />
                </button>
            </div>

            <div className="px-6 pb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Star size={10} className="text-primary fill-primary" />
                            <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">{item.category}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair group-hover:text-primary transition-colors">{item.name}</h3>
                    </div>
                    <span className="text-2xl font-bold text-accent">${item.price}</span>
                </div>

                <p className="text-accent/20 text-xs leading-relaxed mb-10 line-clamp-1 italic">
                    {item.description}
                </p>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(item)}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-4 text-xs font-black tracking-[0.5em] uppercase hover:bg-primary hover:text-secondary hover:border-primary transition-all group/btn shadow-2xl"
                >
                    <div className="relative">
                        <Plus size={20} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                    </div>
                    ADD TO ORDER
                </motion.button>
            </div>
        </motion.div>
    );
}

export default function MenuTabs() {
    const [activeTab, setActiveTab] = useState("Espresso");
    const { addToCart } = useCart();

    const filteredItems = menuItems.filter(item => item.category === activeTab);

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* High-End Technical Navigation */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-24 p-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl w-fit mx-auto overflow-hidden">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "relative px-12 py-4 rounded-full text-[10px] font-black tracking-[0.6em] uppercase transition-all duration-700",
                            activeTab === cat ? "text-secondary" : "text-accent/30 hover:text-accent"
                        )}
                    >
                        <span className="relative z-10">{cat}</span>
                        {activeTab === cat && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Grid of Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-40">
                <AnimatePresence mode="popLayout" initial={false}>
                    {filteredItems.map((item, i) => (
                        <MenuItemCard key={item.id} item={item} index={i} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Floating Status Sculpture */}
            <div className="mt-20 flex justify-center pb-20">
                <div className="flex flex-col items-center gap-6">
                    <span className="text-[10px] font-black tracking-[1em] text-accent/10 uppercase">Signature Batch ID: #BR-882</span>
                    <div className="w-px h-24 bg-gradient-to-b from-primary/30 to-transparent" />
                </div>
            </div>
        </div>
    );
}
