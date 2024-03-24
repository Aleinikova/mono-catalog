export type CategoryType = {
  id: number;
  name: string;
};

export type ProductType = {
  categoryId: number;
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  currency: string;
  inventory: number;
};
