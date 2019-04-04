const express = require('express');
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser');

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

var selectQuery = require("./selectQuery");
var connection = require("./connection");
var queryDatabase = require("./selectQuery");
var execute = require('./execute');




const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get('/', function (req, res) {
  return res.json({
    message: 'hooray! welcome to our api!'
  });
});

router.post('/getRecords', (req, resp) => {
  console.log('getRecords API called');
  if (req.body.query) {
    const query = req.body.query;
    return connection.currentConnection().then(function (cConnection) {
      console.log(cConnection);
      return queryDatabase.queryDB(cConnection, query).then(function (response) {
        resp.statusCode = 200;
        return resp.json(response);
      }).catch(function (error) {
        console.log(error);
        resp.statusCode = 500;
        // resp.statusMessage = error;
        return resp.json(error);
      })
    }).catch(function (error) {
      console.log(error);
      resp.statusCode = 500;
      // resp.statusMessage = {};
      return resp.json(error);
    })
  } else {
    resp.statusCode = 500;
    // resp.statusMessage = {};
    console.log('no query provided');
    return resp.json({});
  }
});

router.post('/execute', (req, resp) => {
  console.log('execute API called');
  // console.log('getRecords called');
  if (req.body.query) {
    const query = req.body.query;
    return connection.currentConnection().then(function (cConnection) {
      console.log(cConnection);
      return execute.execute(cConnection, query).then(function (response) {
        resp.statusCode = 200;
        return resp.json(response);
      }).catch(function (error) {
        console.log(error);
        resp.statusCode = 500;
        // resp.statusMessage = error;
        return resp.json(error);
      })
    }).catch(function (error) {
      console.log(error);
      resp.statusCode = 500;
      return resp.json(error);
    })
  } else {
    resp.statusCode = 500;
    // resp.statusMessage = {};
    console.log('no query provided');
    return resp.json({});
  }

  // console.log(req.body);
  // const select = req.body.query;
  // try {
  //   connection.execute(select, function (err, rows) {
  //     if (err) {
  //       console.log('if(err) = ' + err);
  //       resp.statusCode = 500;
  //       resp.statusMessage = err;
  //       resp.json();
  //     } else {
  //       resp.contentType('application/json');
  //       resp.statusCode = 200;
  //       resp.json(rows);
  //     }
  //   });
  // } catch (err) {
  //   resp.statusCode = 500;
  //   resp.statusMessage = err;
  //   console.log('catch(err) = ' + err);
  //   resp.json();
  // }
});



/**
 * still need to change
 */
router.post('/executeUpdate', (req, resp) => {
  console.log('executeUpdate called');
  console.log(req.body.query);
  const update = req.body.query;
  try {
    connection.execute(update, function (err, rows) {
      if (err) {
        console.log('if(err) = ' + err);
        resp.statusCode = 500;
        resp.statusMessage = err;
        resp.json();
      } else {
        resp.contentType('application/json');
        resp.statusCode = 200;
        resp.json(rows);
      }
    });
  } catch (err) {
    resp.statusCode = 500;
    resp.statusMessage = err;
    console.log('catch(err) = ' + err);
    resp.json();
  }
});

router.post('/makeConnection', (req, resp) => {
  if (req.body.connection) {
    return connection.makeConnection(req.body.connection).then(function (conn) {
      resp.contentType('application/json');
      resp.statusCode = 200;
      // connection = conn
      return resp.json(conn);
    }).catch(function (err) {
      resp.statusCode = 500;
      // resp.statusMessage = err;
      console.log('catch(err) = ' + err);
      resp.json(err);
    })
  } else {
    resp.statusCode = 500;
    // resp.statusMessage = {};
    console.log('no connection provided');
    resp.json({});
  }
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
// export default app;
app.listen(5000);
