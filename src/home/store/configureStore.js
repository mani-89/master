import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reducer from '../reducers/index';
const rootReducer = combineReducers({
  reducer: reducer,
});

const isProduction = (process.env.NODE_ENV == 'production');


export function configureStore(initialState) {
  let composeEnhancers = compose;
  let middlewares = [];

  if (!isProduction) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
