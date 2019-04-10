const cassandra = require('cassandra-driver');
var Promise = require("bluebird");
var DBConfig = require("./DBConfig.json")

var execute = (connection, query) => {
  return new Promise(function (resolve, reject) {
    console.log('execute called');
    const select = query;
    try {
      connection.execute(select, function (err, rows) {
        if (err) {
          console.log('if(err) = ' + err);
          return reject(err);
          // resp.statusCode = 500;
          // resp.statusMessage = err;
          // resp.json();
        } else {
          // resp.contentType('application/json');
          // resp.statusCode = 200;
          // resp.json(rows);
          return resolve(rows);
        }
      });
    } catch (err) {
      // resp.statusCode = 500;
      // resp.statusMessage = err;
      console.log('catch(err) = ' + err);
      // resp.json();
      return reject(err)
    }
  })

}

module.exports.execute = execute;
