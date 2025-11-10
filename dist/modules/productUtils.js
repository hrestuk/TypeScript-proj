"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByPrice = exports.findProduct = void 0;
//Пошук товару по id
const findProduct = (products, id) => {
    return products.find(p => p.id === id);
};
exports.findProduct = findProduct;
//Фільтрація товарів за максимальною ціною
const filterByPrice = (products, maxPrice) => {
    return products.filter(p => p.price <= maxPrice);
};
exports.filterByPrice = filterByPrice;
