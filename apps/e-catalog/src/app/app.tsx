import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Router from '../routes';
import { persistor, store } from '../store/index';

export function App() {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div>Upps... Something went wrong. Try again later</div>
      )}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FluentProvider theme={webLightTheme} style={{ height: '100%' }}>
            <Router />
          </FluentProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
