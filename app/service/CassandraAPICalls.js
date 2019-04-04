import API from './../api/api';
import axios from 'axios';
export default class CassandraAPICalls {
  debugger;
  static fireGetQuery = queryStatement => {
    return axios('http://localhost:5000/api/v1/getRecords', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      data: JSON.stringify({
        query: queryStatement
      })
    });
  };

  static fireQuery = queryStatement => {
    return axios('http://localhost:5000/api/v1/execute', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      data: JSON.stringify({
        query: queryStatement
      })
    });
  };

  static fireUpdateQuery(queryStatement) {
    console.log(queryStatement);
    return axios('http://localhost:5000/api/v1/executeUpdate', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      data: JSON.stringify({
        query: queryStatement
      })
    });
  }

  static makeConnection = (connection, resp) => {
    return fetch('http://localhost:5000/api/v1/makeConnection', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({ connection })
    }).then(res => (resp = res));
  };
}
