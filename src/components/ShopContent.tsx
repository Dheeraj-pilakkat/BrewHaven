"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Filter, X, ChevronRight, Plus, Star, Box, Tag, Layers, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const categories = ["All", "Espresso", "Brewed", "Cold", "Pastries", "Merchandise"];

const products = [
    { id: 11, name: "Velvet Roast", price: 22.99, category: "Espresso", image: "/images/espresso.png", note: "Dark, Smoky, Caramel", stock: "High" },
    { id: 12, name: "Obsidian Blend", price: 24.49, category: "Espresso", image: "/images/espresso.png", note: "Obsidian, Stone Fruit", stock: "Limited" },
    { id: 13, name: "Madagascar Beans", price: 19.99, category: "Espresso", image: "/images/hero.png", note: "Sweet, Vanilla, Floral", stock: "High" },
    { id: 14, name: "House Reserve", price: 21.49, category: "Brewed", image: "/images/hero.png", note: "Balanced, Nutty", stock: "High" },
    { id: 15, name: "Cold Brew Pack", price: 28.49, category: "Cold", image: "/images/cold_brew.png", note: "100% Ethiopian Yirgacheffe", stock: "Limited" },
    { id: 16, name: "Croissant Box", price: 18.25, category: "Pastries", image: "/images/pastries.png", note: "Daily Fresh Delivery", stock: "Out of Stock" },
    { id: 17, name: "Obsidian Mug", price: 32.99, category: "Merchandise", image: "/images/merchandise.png", note: "Matte Ceramic Finish", stock: "High" },
    { id: 18, name: "Traveler V1", price: 48.99, category: "Merchandise", image: "/images/merchandise.png", note: "Titanium Insulation", stock: "Limited" },
];

function ProductCard({ product, index }: { product: any; index: number }) {
    const { addToCart } = useCart();
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

    // Spotlight & Specular Shine
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
    }

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative bg-[#120a07] rounded-[3.5rem] p-4 border border-white/5 transition-all duration-700 hover:border-primary/40 overflow-hidden"
        >
            {/* Dynamic Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([xValue, yValue]) => `radial-gradient(500px circle at ${xValue}px ${yValue}px, rgba(212,165,116,0.1), transparent 80%)`
                    ),
                }}
            />

            {/* Specular Shine Overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([xValue, yValue]) => `linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.4) 50%, transparent 55%)`,
                    ),
                    backgroundPosition : useTransform(
                        [mouseX, mouseY],
                        ([xValue, yValue]) => `${(xValue as number   / 400) * 100}% ${(yValue as number / 400) * 100}%`
                    ),
                    backgroundSize: '200% 200%'
                }}
            />

            {/* Main Image Container */}
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-black/40">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-[2s] ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a07] via-transparent to-transparent opacity-60" />

                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                    <div className={cn(
                        "px-4 py-1.5 rounded-full text-[8px] font-black tracking-[0.2em] uppercase backdrop-blur-md border",
                        product.stock === "Limited" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                            product.stock === "Out of Stock" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                "bg-white/5 text-primary border-white/10"
                    )}>
                        {product.stock}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Layers size={10} className="text-primary/40" />
                            <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">{product.category}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white font-playfair group-hover:text-primary transition-colors">{product.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-accent">${product.price}</p>
                </div>

                <p className="text-accent/20 text-xs leading-relaxed mb-10 line-clamp-1 italic font-medium">
                    {product.note}
                </p>

                {/* CTA Container */}
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product)}
                        disabled={product.stock === "Out of Stock"}
                        className={cn(
                            "flex-1 h-14 rounded-2xl flex items-center justify-center gap-4 text-xs font-black tracking-[0.4em] uppercase transition-all shadow-2xl",
                            product.stock === "Out of Stock"
                                ? "bg-white/5 text-white/10 cursor-not-allowed"
                                : "bg-primary text-secondary hover:bg-white hover:text-secondary shadow-primary/20"
                        )}
                    >
                        <ShoppingCart size={18} />
                        {product.stock === "Out of Stock" ? "Archived" : "Secure Item"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(212,165,116,0.1)" }}
                        className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center text-accent/20 hover:text-primary transition-all"
                    >
                        <Info size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ShopContent() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">

                {/* Architectural Narrative Sidebar */}
                <aside className="w-full lg:w-80 flex-none">
                    <div className="sticky top-32 space-y-16">
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 text-primary">
                                <Zap size={16} />
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase">Archive Collection</span>
                            </div>

                            <div className="space-y-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={cn(
                                            "w-full text-left px-10 py-5 rounded-[2rem] text-[10px] font-black tracking-[0.5em] uppercase transition-all duration-700 relative overflow-hidden group",
                                            activeCategory === cat
                                                ? "bg-primary text-secondary"
                                                : "text-accent/20 hover:text-accent hover:bg-white/5 border border-transparent hover:border-white/5"
                                        )}
                                    >
                                        <span className="relative z-10 flex justify-between items-center">
                                            {cat}
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-all duration-700",
                                                activeCategory === cat ? "bg-secondary scale-150" : "bg-primary/20 scale-0 group-hover:scale-100"
                                            )} />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Technical Spec Box */}
                        <div className="p-10 rounded-[4rem] bg-[#120a07] border border-white/5 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Star size={60} strokeWidth={1} />
                            </div>
                            <h4 className="text-sm font-black tracking-[0.6em] uppercase text-primary mb-6">Private Reserve</h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-[10px] font-medium tracking-widest text-accent/40">
                                    <span>NEXT BATCH</span>
                                    <span className="text-accent">14:02:44</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "75%" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <p className="text-[10px] leading-relaxed text-accent/20 uppercase tracking-widest">
                                    ALL ORDERS PLACED WITHIN THE NEXT 4 HOURS ARE ELIGIBLE FOR PRIORITY ROASTING.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Gallery */}
                <main className="flex-1">
                    {/* Gallery Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-10">
                        <div className="flex items-center gap-8">
                            <span className="text-accent/10 text-[10px] font-black tracking-[0.6em] uppercase">Inventory Volume — {filteredProducts.length} Objects</span>
                            <div className="h-4 w-px bg-white/5" />
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn("p-2 transition-colors", viewMode === "grid" ? "text-primary" : "text-accent/10")}
                                >
                                    <Layers size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn("p-2 transition-colors", viewMode === "list" ? "text-primary" : "text-accent/10")}
                                >
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex items-center gap-6 bg-white/[0.02] border border-white/5 px-8 py-3 rounded-full">
                            <span className="text-[10px] font-black tracking-widest text-accent/20 uppercase">Sort by:</span>
                            <select className="bg-transparent border-none text-primary font-black tracking-[0.3em] uppercase text-[10px] focus:ring-0 cursor-pointer p-0">
                                <option className="bg-[#0a0503]">Chronological Status</option>
                                <option className="bg-[#0a0503]">Prestige (High — Low)</option>
                                <option className="bg-[#0a0503]">Market Value</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Display */}
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            layout
                            className={cn(
                                "grid gap-10",
                                viewMode === "grid"
                                    ? "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
                                    : "grid-cols-1"
                            )}
                        >
                            {filteredProducts.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Interactive Footer Sculpture */}
                    <div className="mt-40 flex flex-col items-center">
                        <div className="w-px h-32 bg-gradient-to-b from-primary/30 to-transparent" />
                        <p className="mt-10 text-[10px] font-black tracking-[1em] text-accent/10 uppercase">Signature Laboratory Series No. 018</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
