// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
// import type { counterStateType } from '../reducers/types';
import initialState from './../data/appstate/initialstate';


const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState1?:any) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
