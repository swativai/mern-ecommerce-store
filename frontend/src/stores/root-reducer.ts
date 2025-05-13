import { combineReducers } from '@reduxjs/toolkit';

import { baseAPI } from './base-api';

export const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
});
