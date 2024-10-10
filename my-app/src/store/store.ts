import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Create and export the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
