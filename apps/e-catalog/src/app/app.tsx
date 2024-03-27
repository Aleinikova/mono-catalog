import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { persistor, store } from '../store/index';
import { PersistGate } from 'redux-persist/integration/react';
import MainLayout from '../layouts/MainLayout';
import Product from '../pages/Product';
import Products from '../pages/Products';
import ProductsLayout from '../layouts/ProductsLayout';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<ProductsLayout />} />
                <Route path=":category" element={<Outlet />}>
                  <Route index element={<Products />} />
                  <Route path=":productId" element={<Product />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </FluentProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
