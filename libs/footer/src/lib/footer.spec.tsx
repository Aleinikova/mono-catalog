import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Footer from './footer';

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(<Footer logo="test" />);
    expect(baseElement).toBeTruthy();
    expect(getByText('test')).toBeInTheDocument();
  });
  it('should match snapshot', async () => {
    const tree = renderer.create(<Footer logo="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
