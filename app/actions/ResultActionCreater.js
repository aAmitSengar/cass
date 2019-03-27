import CassandraAPICalls from './../service/CassandraAPICalls';
import C from './../api/constants';
// import API from './'

export function getCassandraInformation(queryStatement, callbackFn) {
  return function(dispatch) {
    return CassandraAPICalls.fireQuery(queryStatement)
      .then(information => {
        if (information.rows !== undefined) {
          dispatch(callbackFn(information.rows));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

export const AddResult = ResultRows => {
  return {
    type: C.SELECT_Q_RESULT,
    result: ResultRows
  };
};

export function PopulateResult(queryStatement) {
  return getCassandraInformation(queryStatement, AddResult);
}
