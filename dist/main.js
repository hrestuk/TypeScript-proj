"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productUtils_1 = require("./modules/productUtils");
const cart_1 = require("./modules/cart");
// Створюємо тестові товари
const electronics = [
    { id: 1, name: "Телефон", price: 10000, category: "electronics", warrantyMonths: 24 },
    { id: 2, name: "Ноутбук", price: 25000, category: "electronics", warrantyMonths: 12 }
];
const clothes = [
    { id: 3, name: "Футболка", price: 500, category: "clothing", size: "M" },
    { id: 4, name: "Джинси", price: 1200, category: "clothing", size: "L" }
];
const books = [
    { id: 5, name: "TypeScript Handbook", price: 400, category: "book", author: "Microsoft" },
    { id: 6, name: "Clean Code", price: 800, category: "book", author: "Robert Martin" }
];
// Пошук товару
const phone = (0, productUtils_1.findProduct)(electronics, 1);
// Фільтрація за ціною
const cheapItems = (0, productUtils_1.filterByPrice)([...electronics, ...clothes, ...books], 1000);
// Робота з кошиком
let cart = [];
cart = (0, cart_1.addToCart)(cart, phone, 1);
cart = (0, cart_1.addToCart)(cart, (0, productUtils_1.findProduct)(books, 5), 2);
const total = (0, cart_1.calculateTotal)(cart);
console.log("Кошик:", cart);
console.log("Загальна вартість:", total);
console.log("Товари до 1000 грн:", cheapItems);
