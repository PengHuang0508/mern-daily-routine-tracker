import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import logReducer from './reducers/logReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
  log: logReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
