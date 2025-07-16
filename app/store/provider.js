'use client';

import { Provider } from 'react-redux';
import { store } from './store';

/**
 * Redux Provider Component
 * Wraps the application to provide Redux store access
 */
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}