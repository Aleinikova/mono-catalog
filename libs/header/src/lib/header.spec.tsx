import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(<Header logo="test" />);
    expect(baseElement).toBeTruthy();
    expect(getByText('test')).toBeInTheDocument();
  });
  it('should match snapshot', async () => {
    const tree = renderer.create(<Header logo="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
