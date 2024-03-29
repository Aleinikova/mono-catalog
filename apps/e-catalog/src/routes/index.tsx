import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Product from '../pages/Product';
import Products from '../pages/Products';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Products />} />
          <Route path=":category" element={<Outlet />}>
            <Route index element={<Products />} />
            <Route path=":productId" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
