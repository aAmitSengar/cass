import C from './../api/constants';

export function setColumns(clmnName, clmnValue) {
  return {
    type: C.INSERT_COLUMNS,
    clmnName: clmnName,
    clmnValue: clmnValue
  };
}
