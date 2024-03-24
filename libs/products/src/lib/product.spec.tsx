import { render } from '@testing-library/react';

import Product from './product';

const PRODUCT = {
  categoryId: 1,
  id: 1,
  name: 'iPhoneX',
  imageUrl:
    'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
  price: '1000',
  currency: 'usd',
  inventory: 10,
};

describe('Product', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Product product={PRODUCT} />);
    expect(baseElement).toBeTruthy();
  });
});
