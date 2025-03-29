import {configureStore} from '@reduxjs/toolkit';
import {providerReducer} from './providerSlice';

export const store = configureStore({
  reducer: {
    provider: providerReducer,
  },
});
