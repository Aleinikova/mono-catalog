export type CategoryType = {
  id: string;
  name: string;
  fields?: ProductField[];
};

export interface ProductType {
  categoryId: string;
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  currency: string;
  inventory: number;
  [key: string]: string | number;
}

export type StoreState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ProductFieldType = 'string' | 'number' | 'select';

export type ProductFieldOption = {
  id: string;
  value: string;
  text: string;
};

export type ProductField = {
  name: string;
  type: ProductFieldType;
  title: string;
  options?: ProductFieldOption[];
};

export type Action = {
  label: string;
  onClick: (productId: string) => void;
};
