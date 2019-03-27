import C from './../api/constants';

export default function resultDataReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.SELECT_Q_RESULT: {
      debugger;
      const newState = {
        ...state,
        result: [...action.payload]
      };
      return newState;
    }
    case C.RESET_STATE: {
      return state;
    }
    default:
      return state;
  }
}
