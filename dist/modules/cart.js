"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.addToCart = void 0;
//Додавання товару в кошик
const addToCart = (cart, product, quantity) => {
    if (!product)
        return cart; // якщо товар не знайдено
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    return cart;
};
exports.addToCart = addToCart;
//Підрахунок загальної вартості кошика
const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};
exports.calculateTotal = calculateTotal;
