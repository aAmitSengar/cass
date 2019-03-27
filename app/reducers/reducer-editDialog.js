// const initialState = {
//     isOpen: false,
//     data: {},
// }
import C from './../api/constants';

export default function editDialogReducer(state = {}, action = {}) {
  switch (action.type) {
    case C.FLIP_EDIT_DIALOG_BOX: {
      return {
        ...state,
        isOpen: !state.isOpen,
        data: action.data
      };
    }
    case C.UPDATE_EDIT_DIALOG_DATA: {
      return {
        ...state,
        data: action.data
      };
    }

    default:
      return state;
  }
}
