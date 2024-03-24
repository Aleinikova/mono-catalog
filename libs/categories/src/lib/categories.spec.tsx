import { render } from '@testing-library/react';

import Categories from './categories';

const CATEGORIES = [
  {
    id: 1,
    name: 'phone',
  },
  {
    id: 2,
    name: 'tv',
  },
  {
    id: 3,
    name: 'computer',
  },
];

describe('Categories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Categories categories={CATEGORIES} />);
    expect(baseElement).toBeTruthy();
  });
});
