import C from './../api/constants';

export function showNotification(isShown_, message_, nature_) {
  return {
    type: C.SHOW_NOTIFICATION,
    isShown_: isShown_,
    message_: message_,
    nature_: nature_
  };
}
