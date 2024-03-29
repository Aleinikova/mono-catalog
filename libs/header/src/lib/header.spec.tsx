import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <Header Logo={() => <div>logo</div>} />
    );
    expect(baseElement).toBeTruthy();
    expect(getByText('logo')).toBeInTheDocument();
  });
  it('should match snapshot', async () => {
    const tree = renderer
      .create(<Header Logo={() => <div>logo</div>} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
