import { Electronics, Clothing, Book } from "./types/products";
import { findProduct, filterByPrice } from "./modules/productUtils";
import { addToCart, calculateTotal, CartItem } from "./modules/cart";

// Створюємо тестові товари
const electronics: Electronics[] = [
  { id: 1, name: "Телефон", price: 10000, category: "electronics", warrantyMonths: 24 },
  { id: 2, name: "Ноутбук", price: 25000, category: "electronics", warrantyMonths: 12 }
];

const clothes: Clothing[] = [
  { id: 3, name: "Футболка", price: 500, category: "clothing", size: "M" },
  { id: 4, name: "Джинси", price: 1200, category: "clothing", size: "L" }
];

const books: Book[] = [
  { id: 5, name: "TypeScript Handbook", price: 400, category: "book", author: "Microsoft" },
  { id: 6, name: "Clean Code", price: 800, category: "book", author: "Robert Martin" }
];

// Пошук товару
const phone = findProduct(electronics, 1);

// Фільтрація за ціною
const cheapItems = filterByPrice([...electronics, ...clothes, ...books], 1000);

// Робота з кошиком
let cart: CartItem<Electronics | Clothing | Book>[] = [];
cart = addToCart(cart, phone, 1);
cart = addToCart(cart, findProduct(books, 5), 2);

const total = calculateTotal(cart);

console.log("Кошик:", cart);
console.log("Загальна вартість:", total);
console.log("Товари до 1000 грн:", cheapItems);
