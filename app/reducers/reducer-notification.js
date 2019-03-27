// const initialState = {
//   isShown: false,
//   message: '',
//   nature: 'success',
// }
import C from './../api/constants';
export default function notificationReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.SHOW_NOTIFICATION: {
      const newState = {
        ...state,
        isShown: action.isShown_,
        message: action.message_,
        nature: action.nature_
      };
      return newState;
    }
    default:
      return state;
  }
}
