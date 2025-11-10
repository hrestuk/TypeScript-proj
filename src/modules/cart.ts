import { BaseProduct } from "../types/products";

export type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};


//Додавання товару в кошик
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T | undefined,
  quantity: number
): CartItem<T>[] => {
  if (!product) return cart; // якщо товар не знайдено
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};


//Підрахунок загальної вартості кошика
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};