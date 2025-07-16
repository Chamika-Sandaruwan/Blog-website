import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';

/**
 * Redux store configuration
 * Combines all feature slices for global state management
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// TypeScript types for store (commented out for JavaScript)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;