const cassandra = require('cassandra-driver');
var Promise = require("bluebird");
var DBConfig = require("./DBConfig.json")

var queryDatabase = (connection, query) => {
  return new Promise(function (resolve, reject) {
    console.log('getRecords called');
    let rows = [];
    try {
      return connection
        .stream(query, null, {
          prepare: true,
          autopage: true
        })
        .on('readable', function () {
          let row;
          while ((row = this.read())) {
            rows.push(row);
          }
        })
        .on('end', function () {
          if (rows.length > 0) {
            return resolve(rows);

          } else {
            return resolve({
              statusMessage: 'No Record Found'
            });
          }
        })
        .on('error', function (err) {
          console.log('if(err) = ' + err);
          return reject({
            statusMessage: err
          })

        });
    } catch (err) {
      console.log('catch(err) = ' + err);
      return reject({
        statusMessage: err
      })

    }
  })

}

module.exports.queryDB = queryDatabase;
