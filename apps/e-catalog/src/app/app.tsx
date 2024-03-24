import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from '../pages/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
]);

export function App() {
  return (
    <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
}

export default App;
