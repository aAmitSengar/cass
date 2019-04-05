// const initialState = {
//   keyspaces: [],
//   columnFamilies: [],
//   columnDetails: [],
//   filterBy: [],
//   operation: ["=","!="],
//   condition: "",
//   result: "",
// }
import C from './../api/constants';
import _ from 'lodash';

function filterKeySpace(payload) {
  let keyspaces = _.chain(payload).get('rows').map("keyspace_name").value();
  return keyspaces;
}

function filterColumnFamilies(payload) {
  let tables = _.chain(payload).get('rows').map("table_name").uniq().value();
  return tables;
}

function filterColumns(payload) {
  let columns = _.chain(payload).get('rows').uniq().value();
  return columns;
}

export default function formDataReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.ADD_KEYSPACES:
      {
        const newState = {
          ...state,
          keyspaces: filterKeySpace(action.payload)
        };
        return newState;
      }
    case C.ADD_COLUMN_FAMILIES:
      {
        const newState = {
          ...state,
          columnFamilies: filterColumnFamilies(action.payload)
        };
        return newState;
      }
    case C.ADD_COLUMNS:
      {
        let newState = {
          ...state
        };
        let details = filterColumns(action.payload)
        newState = {
          ...state,
          columnDetails: details,
          filterBy: details
        };
        return newState;
      }
    case C.RESET_STATE:
      {
        return state;
      }
    case C.KEYSPACE_VALUE_CHANGED:
      {
        const newState = {
          ...state,
          keyspace: action.keyspace,
          columnFamilies: state.columnFamilies,
          columnDetails: state.columnDetails
        };
        return newState;
      }

    default:
      return state;
  }
}
