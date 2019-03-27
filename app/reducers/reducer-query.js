import C from './../api/constants';
// const initialState = {
//   keyspace: "",
//   columnFamily: "",
//   columns: [],
//   filterBy: "",
//   operation: "",
//   statement: "",
//   condition: "",
//   limit: 100,
// }

export default function queryReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.KEYSPACE_VALUE_CHANGED: {
      const newState = {
        ...state,
        keyspace: action.keyspace,
        columnFamily: state.columnFamily,
        columns: state.columns,
        filterBy: state.filterBy,
        operation: state.operation,
        statement: state.statement,
        condition: state.condition
      };
      return newState;
    }
    case C.COLUMN_FAMILY_VALUE_CHANGED: {
      const newState = {
        ...state,
        columnFamily: action.columnFamily,
        columns: state.columns,
        filterBy: state.filterBy,
        operation: state.operation,
        statement: state.statement,
        condition: state.condition
      };
      return newState;
    }
    case C.COLUMNS_VALUE_CHANGED: {
      return {
        ...state,
        columns: [...action.columns]
      };
    }

    case C.CONDITION_CHANGED: {
      const newState = {
        ...state,
        condition: action.condition
      };
      return newState;
    }
    case C.QUERY_FORMED: {
      const newState = {
        ...state,
        statement: action.statement
      };
      return newState;
    }
    case C.ADD_LIMIT: {
      const newState = {
        ...state,
        limit: action.limit
      };
      return newState;
    }
    case C.RESET_STATE: {
      return {
        keyspace: '',
        columnFamily: '',
        columns: [],
        filterBy: '',
        operation: '',
        statement: '',
        condition: '',
        limit: 100
      };
    }
    default:
      return state;
  }
}
