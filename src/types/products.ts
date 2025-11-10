export type BaseProduct = {
  id: number;
  name: string;
  price: number;
};

export type Electronics = BaseProduct & {
  category: 'electronics';
  warrantyMonths: number;
};

export type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
};

export type Book = BaseProduct & {
  category: 'book';
  author: string;
};