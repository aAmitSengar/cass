// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import connectionsReducer from './reducer-connections'
import queryReducer  from "./reducer-query"
import formDataReducer from "./reducer-formdata"
import resultDataReducer from "./reducer-resultdata"
import conditionReducer from "./reducer-condition"
import notificationReducer from "./reducer-notification"
import insertDataReducer from "./reducer-insertData"
import editDialogReducer from "./reducer-editDialog"
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const allReducers = combineReducers(
//   {
//       router: connectRouter(history),

//   }
// )

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    connectionsReducer: connectionsReducer,
    queryReducer: queryReducer,
    formDataReducer: formDataReducer,
    resultDataReducer: resultDataReducer,
    conditionReducer: conditionReducer,
    notificationReducer: notificationReducer,
    insertDataReducer: insertDataReducer,
    editDialogReducer: editDialogReducer,
  });
}
