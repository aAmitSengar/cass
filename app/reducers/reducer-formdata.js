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

export default function formDataReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.ADD_KEYSPACES: {
      const newState = {
        ...state,
        keyspaces: [...action.keyspaces]
      };
      return newState;
    }
    case C.ADD_COLUMN_FAMILIES: {
      const newState = {
        ...state,
        columnFamilies: [...action.columnFamilies]
      };
      return newState;
    }
    case C.ADD_COLUMNS: {
      let newState = { ...state };
      newState = {
        ...state,
        columnDetails: [...action.ColumnDetails],
        filterBy: [...action.ColumnDetails]
      };
      return newState;
    }
    case C.RESET_STATE: {
      return state;
    }
    case C.KEYSPACE_VALUE_CHANGED: {
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
