import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Homepage from '../pages/Homepage';
import ProductsContainer from '../features/products';

import { store } from '../store/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: [
      {
        path: ':category',
        element: <ProductsContainer />,
      },
    ],
  },
]);

export function App() {
  return (
    <Provider store={store}>
      <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
        <RouterProvider router={router} />
      </FluentProvider>
    </Provider>
  );
}

export default App;
