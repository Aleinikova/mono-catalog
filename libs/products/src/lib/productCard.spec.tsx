import { currencyFormatter } from '@mono-catalog/currency-formatter';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { ProductCard } from './productCard';

describe('Product', () => {
  it('should render successfully', () => {
    const product = {
      categoryId: '1',
      id: '1',
      name: 'iPhoneX',
      imageUrl:
        'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
      price: '1000',
      currency: 'usd',
      inventory: 10,
    };

    const { baseElement, getByText, getByTestId } = render(
      <ProductCard product={product} actions={[]} />
    );
    expect(baseElement).toBeTruthy();

    const productEl = getByTestId(`product-${product.id}`);

    expect(productEl).toBeInTheDocument();
    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(`(${product.inventory})`)).toBeInTheDocument();
    expect(
      getByText(currencyFormatter(+product.price, product.currency))
    ).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const product = {
      categoryId: '1',
      id: '1',
      name: 'iPhoneX',
      imageUrl:
        'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
      price: '1000',
      currency: 'usd',
      inventory: 10,
    };

    const tree = renderer
      .create(<ProductCard product={product} actions={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
