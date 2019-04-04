const cassandra = require('cassandra-driver');
var Promise = require("bluebird");
var DBConfig = require("./DBConfig.json")
let newConnection;



function getCurrentconnection() {
  return new Promise(function (resolve, reject) {
    if (newConnection) {
      return resolve(newConnection)
    } else {
      return reject({
        message: "No default connection found."
      })
    }
  })

}

function ConnectToDB(connection) {
  return new Promise(function (resolve, reject) {
    connection.connect(function (err, result) {
      console.log('connect called with', result);
      if (err) {
        console.log('err' + err);
        return reject(err)
      } else {
        console.log('cassandra connected');
        return resolve({
          status: 'Connected'
        })
      }
    });
  })
}


var makeConnection = (connection) => {
  return new Promise(function (resolve, reject) {
    console.log('makeConnection called');
    // console.log(connection);
    let newconfig = {};
    newconfig = {
      contactPoints: [connection.contactPoints],
      keyspace: connection.keyspace,
      port: connection.port,
      localDataCenter: 'datacenter1'
    };
    let authProvider;
    if (
      connection.uid !== undefined &&
      connection.pwd !== undefined
    ) {
      authProvider = new cassandra.auth.PlainTextAuthProvider(
        connection.uid,
        connection.pwd
      );
      newconfig = {
        ...newconfig,
        authProvider: authProvider
      };
    }
    // console.log(newconfig);
    newConnection = new cassandra.Client(newconfig);
    return ConnectToDB(newConnection).then(function (response) {
      return resolve(response)
    }).catch(function (error) {
      return reject(error)
    });

  })
}

module.exports.currentConnection = getCurrentconnection;

module.exports.makeConnection = makeConnection;
