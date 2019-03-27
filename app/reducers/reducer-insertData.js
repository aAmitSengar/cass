// const initialState = {}
import C from './../api/constants';

export default function insertDataReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.INSERT_COLUMNS: {
      const newState = {
        ...state,
        [action.clmnName]: action.clmnValue
      };
      return newState;
    }
    default:
      return state;
  }
}
