import { createStore, combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transaction: transactionReducer,
});

export const store = createStore(rootReducer);

export default store;