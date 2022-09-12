import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './SearchReducer';
import { cartReducer } from './cartReducers';
import { drawReducer } from './drawerReducer';

const rootreducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawReducer,
});

export default rootreducer;
