import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Products from './products';

describe('Products', () => {
  it('should render successfully', () => {
    const products = [
      {
        categoryId: '1',
        id: '1',
        name: 'iPhoneX',
        imageUrl:
          'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
      {
        categoryId: '2',
        id: '2',
        name: 'Samsung',
        imageUrl:
          'https://images.samsung.com/is/image/samsung/latin-en-uhdtv-nu7100-un50nu7100pxpa-frontblack-121432508?$650_519_PNG$',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
      {
        categoryId: '3',
        id: '3',
        name: 'Dell',
        imageUrl:
          'https://i.pinimg.com/originals/3e/7b/90/3e7b90192ec52d66d07dd209e3373985.png',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
    ];

    const { baseElement, getByTestId } = render(
      <Products
        products={products}
        actions={[
          {
            label: 'Edit',
            onClick: (productId) => {
              console.log(productId);
            },
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();

    const productElements = products.map((product) =>
      getByTestId(`product-${product.id}`)
    );

    productElements.forEach((productElement) => {
      expect(productElement).toBeInTheDocument();
    });
  });
  it('should match snapshot', () => {
    const products = [
      {
        categoryId: '1',
        id: '1',
        name: 'iPhoneX',
        imageUrl:
          'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
      {
        categoryId: '2',
        id: '2',
        name: 'Samsung',
        imageUrl:
          'https://images.samsung.com/is/image/samsung/latin-en-uhdtv-nu7100-un50nu7100pxpa-frontblack-121432508?$650_519_PNG$',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
      {
        categoryId: '3',
        id: '3',
        name: 'Dell',
        imageUrl:
          'https://i.pinimg.com/originals/3e/7b/90/3e7b90192ec52d66d07dd209e3373985.png',
        price: '1000',
        currency: 'usd',
        inventory: 10,
      },
    ];

    const tree = renderer
      .create(
        <Products
          products={products}
          actions={[
            {
              label: 'Edit',
              onClick: (productId) => {
                console.log(productId);
              },
            },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
