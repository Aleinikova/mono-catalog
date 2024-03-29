import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Categories from './categories';

describe('Categories', () => {
  it('should render successfully', () => {
    const categories = [
      {
        id: '1',
        name: 'phone',
        title: 'Phones',
      },
      {
        id: '2',
        name: 'tv',
        title: 'TVs',
      },
      {
        id: '3',
        name: 'computer',
        title: 'Computers',
      },
    ];

    const { baseElement, getByText, getByTestId } = render(
      <Categories categories={categories} />,
      { wrapper: BrowserRouter }
    );
    expect(baseElement).toBeTruthy();

    categories.forEach((category) => {
      const categoryElement = getByTestId(`category-${category.id}`);
      expect(categoryElement).toBeInTheDocument();
      expect(getByText(category.title)).toBeInTheDocument();
    });
  });
  it('should link redirect successfully', async () => {
    const categories = [
      {
        id: '1',
        name: 'phone',
        title: 'Phones',
      },
    ];

    const { baseElement, getByTestId, getByText } = render(
      <Categories categories={categories} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(baseElement).toBeTruthy();

    const categoryElement = getByTestId(`category-${categories[0].id}`);

    const user = userEvent.setup();

    await user.click(categoryElement);
    expect(getByText(categories[0].title)).toBeInTheDocument();
  });
  it('should match snapshot', async () => {
    const categories = [
      {
        id: '1',
        name: 'phone',
        title: 'Phones',
      },
      {
        id: '2',
        name: 'tv',
        title: 'TVs',
      },
      {
        id: '3',
        name: 'computer',
        title: 'Computers',
      },
    ];

    const tree = renderer
      .create(
        <BrowserRouter>
          <Categories categories={categories} />,
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
