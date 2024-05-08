import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notesReducer from '../redux/slices/notesSlice';

const rootReducer = combineReducers({
  notes: notesReducer,
  // Add other reducers if you have any
});

const persistConfig = {
  key: 'root',
  storage,
  // You can specify other configurations here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add any middleware or enhancers here
});

export const persistor = persistStore(store);
