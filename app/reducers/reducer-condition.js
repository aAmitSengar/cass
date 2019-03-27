// const initialState = {
//   filterByCondtion: [],
//   count: 1,
// }
import C from './../api/constants';

export default function conditionReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.ADD_UPDATE_CONDITION: {
      return {
        ...state,
        filterByCondtion: action.filterByCondtion
      };
    }

    case C.INCREASE_CONDITION: {
      const newState = {
        ...state,
        count: state.count + 1
      };
      return newState;
    }

    case C.DECREASE_CONDITION: {
      const newState = {
        ...state,
        ...action.payload
      };
      return newState;
    }
    case C.RESET_STATE:
    case C.RESET_ALL_CONDITIONS: {
      return {
        ...state,
        filterByCondtion: [],
        count: 1
      };
    }
    default:
      return state;
  }
}
