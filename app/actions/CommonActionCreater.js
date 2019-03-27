import C from './../api/constants';

export const resetState = () => {
  return {
    type: C.RESET_STATE,
    payload: ''
  };
};
export const resetAllConditions = () => {
  return {
    type: C.RESET_ALL_CONDITIONS,
    payload: ''
  };
};
