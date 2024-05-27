const mongoose = require('mongoose');
const ProductItem = require('../models/ProductItems'); // Adjust the path to your ProductItem model

const mongoURI = "mongodb://localhost:27017/product-app";

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error(err));


let ownerId = "664982e0edf4b00b804b9a4e"

const productItems = [
    {
        name: "Smartphone",
        category: "electronics",
        description: "Latest model smartphone with high-resolution display and powerful processor.",
        features: ["High-resolution display", "Powerful processor", "5G connectivity", "Long battery life"],
        price: "50000", // Price in rupees
        owner: ownerId, // Specified owner ID
        images: [
            { url: "https://example.com/smartphone.jpg", filename: "smartphone.jpg" }
        ],
        warrantyInfo: "1 year manufacturer warranty",
        specifications: ["Display: 6.5 inches", "Processor: Octa-core", "Battery: 4500mAh", "Color: Black"],
        brand: "TechBrand",
        color: "Black",
        material: "Glass and metal"
    },
    {
        name: "Laptop",
        category: "electronics",
        description: "High-performance laptop suitable for gaming and professional use.",
        features: ["High-performance processor", "Dedicated graphics card", "SSD storage", "Backlit keyboard"],
        price: "80000", // Price in rupees
        owner: ownerId, // Specified owner ID
        images: [
            { url: "https://example.com/laptop.jpg", filename: "laptop.jpg" }
        ],
        warrantyInfo: "2 years manufacturer warranty",
        specifications: ["Processor: Intel i7", "RAM: 16GB", "Storage: 512GB SSD", "Color: Silver"],
        brand: "CompTech",
        color: "Silver",
        material: "Aluminum"
    },
    {
        name: "Wireless Headphones",
        category: "electronics",
        description: "Noise-cancelling wireless headphones with high-fidelity sound quality.",
        features: ["Noise-cancelling", "High-fidelity sound", "Bluetooth connectivity", "Long battery life"],
        price: "12000", // Price in rupees
        owner: ownerId, // Specified owner ID
        images: [
            { url: "https://example.com/wireless-headphones.jpg", filename: "wireless-headphones.jpg" }
        ],
        warrantyInfo: "1 year manufacturer warranty",
        specifications: ["Battery life: 30 hours", "Bluetooth range: 10 meters", "Color: Black"],
        brand: "AudioPlus",
        color: "Black",
        material: "Plastic"
    },
    {
        name: "Smartwatch",
        category: "electronics",
        description: "Feature-packed smartwatch with fitness tracking and notifications.",
        features: ["Fitness tracking", "Notifications", "Water-resistant", "Long battery life"],
        price: "10000", // Price in rupees
        owner: ownerId, // Specified owner ID
        images: [
            { url: "https://example.com/smartwatch.jpg", filename: "smartwatch.jpg" }
        ],
        warrantyInfo: "1 year manufacturer warranty",
        specifications: ["Display: 1.5 inches", "Battery life: 7 days", "Water resistance: 50 meters", "Color: Black"],
        brand: "WearTech",
        color: "Black",
        material: "Plastic"
    },
    {
        name: "4K Television",
        category: "electronics",
        description: "Ultra HD 4K television with smart features and vibrant colors.",
        features: ["Ultra HD 4K", "Smart features", "HDR", "Multiple HDMI ports"],
        price: "60000", // Price in rupees
        owner: ownerId, // Specified owner ID
        images: [
            { url: "https://example.com/4k-television.jpg", filename: "4k-television.jpg" }
        ],
        warrantyInfo: "2 years manufacturer warranty",
        specifications: ["Screen size: 55 inches", "Resolution: 3840x2160", "HDR: Yes", "Color: Black"],
        brand: "VisionTech",
        color: "Black",
        material: "Plastic and metal"
    }
];

ProductItem.insertMany(productItems);

