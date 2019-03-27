// const initialState = {
//     connections: [
//         {
//             contactPoints: "localhost",
//             port: 9042,
//             uid: "",
//             pwd: "",
//             keyspace: "system_schema",
//             name: "localhost"
//         }
//     ],
//     connectedIndex: -1
// }
import C from './../api/constants';

export default function connectionReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.IMPORT_CONNECTIONS: {
      const connections = [...state.connections, ...action.connections];
      const newState = {
        ...state,
        connections: connections
      };
      return newState;
    }
    case C.ADD_CONNECTION: {
      const connections = [...state.connections, action.connections];
      const newState = {
        ...state,
        connections: connections
      };
      return newState;
    }
    case C.DELETE_CONNECTION: {
      const newState = {
        ...state,
        connections: action.connections
      };
      return newState;
    }
    case C.MAKE_CONNECTION: {
      return {
        ...state
        // connectedIndex: action,
      };
    }
    case C.SET_CONNECTION_INDEX: {
      return {
        ...state,
        connectedIndex: action.index
      };
    }
    default:
      return state;
  }
}
