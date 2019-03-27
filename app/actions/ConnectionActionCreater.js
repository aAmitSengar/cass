// import CassandraAPICalls from "../service/CassandraAPICalls"
import C from './../api/constants';

// export function makeConnection(connection) {
//     return function (dispatch) {
//         CassandraAPICalls.makeConnection(connection).then(information => {
//         }).catch(error => {
//             throw (error)
//         })
//     }
// }
export function setConnectedDBIndex(index) {
  return {
    type: C.SET_CONNECTION_INDEX,
    index: index
  };
}
export const MakeConnection = connection => {
  console.log('AddNewConnection : ');
  return {
    type: C.MAKE_CONNECTION,
    connection: connection
  };
};
export const AddNewConnection = connection => {
  console.log('AddNewConnection : ');
  return {
    type: C.ADD_CONNECTION,
    connections: connection
  };
};

export const ImportConnections = connections => {
  console.log('ImportConnections : ');
  return {
    type: C.IMPORT_CONNECTIONS,
    connections: connections
  };
};

export const deleteConnection = (connections, index) => {
  console.log('deleteConnection : ');
  connections.splice(index, 1);
  return {
    type: C.DELETE_CONNECTION,
    connections: connections
  };
};
