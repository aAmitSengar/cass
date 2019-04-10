/* eslint-disable flowtype/no-weak-types */
// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import initialState from '../data/appstate/initialstate';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

// eslint-disable-next-line flowtype/no-weak-types
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line flowtype/no-weak-types
// eslint-disable-next-line no-unused-vars
function configureStore(initialState1?: any) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
