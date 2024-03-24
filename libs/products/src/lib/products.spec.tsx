import { render } from '@testing-library/react';

import Products from './products';

const PRODUCTS = [
  {
    categoryId: 1,
    id: 1,
    name: 'iPhoneX',
    imageUrl:
      'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
    price: '1000',
    currency: 'usd',
    inventory: 10,
  },
  {
    categoryId: 2,
    id: 2,
    name: 'Samsung',
    imageUrl:
      'https://images.samsung.com/is/image/samsung/latin-en-uhdtv-nu7100-un50nu7100pxpa-frontblack-121432508?$650_519_PNG$',
    price: '1000',
    currency: 'usd',
    inventory: 10,
  },
  {
    categoryId: 3,
    id: 3,
    name: 'Dell',
    imageUrl:
      'https://i.pinimg.com/originals/3e/7b/90/3e7b90192ec52d66d07dd209e3373985.png',
    price: '1000',
    currency: 'usd',
    inventory: 10,
  },
];

describe('Products', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Products products={PRODUCTS} />);
    expect(baseElement).toBeTruthy();
  });
});
