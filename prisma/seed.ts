import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
    { name: "Espresso", image: "/images/espresso.png" },
    { name: "Brewed", image: "/images/hero.png" }, // Reusing hero for brewed
    { name: "Cold", image: "/images/cold_brew.png" },
    { name: "Pastries", image: "/images/pastries.png" },
    { name: "Merchandise", image: "/images/merchandise.png" },
];

const products = [
    // Espresso
    { name: "Classic Espresso", price: 2.99, category: "Espresso", image: "/images/espresso.png", description: "Rich, bold, and perfectly extracted." },
    { name: "Double Macchiato", price: 3.49, category: "Espresso", image: "/images/espresso.png", description: "Espresso with a dash of foamy milk." },
    { name: "Vanilla Latte", price: 4.99, category: "Espresso", image: "/images/espresso.png", description: "Smooth espresso with steamed milk and vanilla syrup." },
    { name: "Caramel Macchiato", price: 5.49, category: "Espresso", image: "/images/espresso.png", description: "Sweet and creamy with a caramel drizzle." },
    { name: "Cortado", price: 3.99, category: "Espresso", image: "/images/espresso.png", description: "Equal parts espresso and warm milk." },

    // Brewed
    { name: "House Blend", price: 2.49, category: "Brewed", image: "/images/hero.png", description: "Our signature medium roast." },
    { name: "Dark Roast", price: 2.49, category: "Brewed", image: "/images/hero.png", description: "Bold and intense flavor profile." },
    { name: "Pour Over (Origin Selection)", price: 4.50, category: "Brewed", image: "/images/hero.png", description: "Single-origin beans brewed to perfection." },
    { name: "French Press", price: 5.00, category: "Brewed", image: "/images/hero.png", description: "Classic full-bodied brewing method." },

    // Cold
    { name: "Cold Brew", price: 4.49, category: "Cold", image: "/images/cold_brew.png", description: "Steeped for 20 hours for maximum smoothness." },
    { name: "Nitro Cold Brew", price: 5.49, category: "Cold", image: "/images/cold_brew.png", description: "Infused with nitrogen for a creamy head." },
    { name: "Iced Americano", price: 3.49, category: "Cold", image: "/images/cold_brew.png", description: "Espresso shots topped with cold water and ice." },
    { name: "Peach Iced Tea", price: 3.99, category: "Cold", image: "/images/cold_brew.png", description: "Refreshing brewed tea with peach notes." },
    { name: "Cold Brew Latte", price: 4.99, category: "Cold", image: "/images/cold_brew.png", description: "Smooth cold brew with your choice of milk." },

    // Pastries
    { name: "Butter Croissant", price: 3.25, category: "Pastries", image: "/images/pastries.png", description: "Flaky, buttery, and golden brown." },
    { name: "Chocolate Croissant", price: 3.75, category: "Pastries", image: "/images/pastries.png", description: "Danish pastry filled with rich chocolate." },
    { name: "Blueberry Muffin", price: 2.99, category: "Pastries", image: "/images/pastries.png", description: "Bursting with fresh blueberries." },
    { name: "Almond Danish", price: 4.25, category: "Pastries", image: "/images/pastries.png", description: "Sweet almond filling with toasted almonds." },
    { name: "Cinnamon Roll", price: 3.99, category: "Pastries", image: "/images/pastries.png", description: "Warm and gooey with cream cheese icing." },

    // Merchandise
    { name: "BrewHaven Ceramic Mug", price: 12.99, category: "Merchandise", image: "/images/merchandise.png", description: "12oz ceramic mug with matte finish." },
    { name: "Travel Tumbler", price: 18.99, category: "Merchandise", image: "/images/merchandise.png", description: "Insulated stainless steel tumbler." },
    { name: "Signature Bean Bag (250g)", price: 14.99, category: "Merchandise", image: "/images/merchandise.png", description: "Our house blend whole beans." },
    { name: "Coffee Scoop", price: 8.99, category: "Merchandise", image: "/images/merchandise.png", description: "Brass coffee scoop for perfect measurement." },
    { name: "Canvas Tote Bag", price: 9.99, category: "Merchandise", image: "/images/merchandise.png", description: "Eco-friendly tote for your coffee runs." },
];

async function main() {
    console.log("Start seeding...");

    // Clear existing data
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Seed Categories
    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
    }

    // Seed Products
    for (const product of products) {
        await prisma.product.create({
            data: {
                ...product,
                stock: Math.floor(Math.random() * 100) + 10,
            },
        });
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
