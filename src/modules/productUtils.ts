import { BaseProduct } from "../types/products";

//Пошук товару по id
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find(p => p.id === id);
};

//Фільтрація товарів за максимальною ціною
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter(p => p.price <= maxPrice);
};
