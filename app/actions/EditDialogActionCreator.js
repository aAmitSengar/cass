import C from './../api/constants';

export const flipEditDailog = data => {
  return {
    type: C.FLIP_EDIT_DIALOG_BOX,
    data: data
  };
};

export const updateEditDailogData = data => {
  return {
    type: C.UPDATE_EDIT_DIALOG_DATA,
    data: data
  };
};
