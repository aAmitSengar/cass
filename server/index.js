const express = require('express');
const cassandra = require("cassandra-driver");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const dbConfig = {
  contactPoints: ['localhost'],
  keyspace: 'system_schema',
  //    authProvider: authProvider,
  port: 9042,
  // localDataCenter: "datacenter1",
  //maxVersion: '3.4.4',
  protocolOptions: {
    port: 9042,
    // maxVersion: 4,
  }
}
// const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], keyspace: 'ks1' });

let ConnectToDB = (connection, resp) => {

  // const client = new cassandra.Client({
  //   contactPoints: ['localhost'],
  //   keyspace: 'system_schema',
  //   protocolOptions: {
  //     port: 9042
  //   },
  //   localDataCenter: 'datacenter1'
  // });
  // client.connect(function (err) {
  //   assert.ifError(err);
  // });

  connection.connect(function (err, result) {
    console.log('connect called with');

    if (err) {
      console.log("err" + err)
      resp.statusCode = 500
      resp.json({
        "status": "Not Connected"
      })
    } else {
      console.log('cassandra connected');
      resp.statusCode = 200
      resp.json({
        "status": "Connected"
      })
    }
  })
}

let connection = new cassandra.Client(dbConfig);



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});




router.post('/getRecords', (req, resp) => {
  console.log('getRecords called')
  console.log(req.body.query)
  const query = req.body.query
  let rows = []
  try {
    connection.stream(query, null, {
        prepare: true,
        autopage: true
      })
      .on('readable', function () {
        let row;
        while (row = this.read()) {
          rows.push(row);
        }
      })
      .on('end', function () {
        resp.contentType('application/json')
        if (rows.length > 0) {
          resp.statusCode = 200
          resp.json(rows)
        } else {
          resp.statusCode = 500
          resp.statusMessage = "No Record Found"
          resp.json(rows)
        }

      })
      .on('error', function (err) {
        console.log("if(err) = " + err)
        resp.statusCode = 500
        resp.statusMessage = err
        resp.json()
      })
  } catch (err) {
    resp.statusCode = 500
    resp.statusMessage = err
    console.log("catch(err) = " + err)
    resp.json()
  }
})


router.post('/execute', (req, resp) => {
  console.log('execute called')
  console.log(req.body)
  const select = req.body.query
  try {
    connection.execute(select, function (err, rows) {
      if (err) {
        console.log("if(err) = " + err)
        resp.statusCode = 500
        resp.statusMessage = err
        resp.json()
      } else {
        resp.contentType('application/json')
        resp.statusCode = 200
        resp.json(rows)

      }
    })
  } catch (err) {
    resp.statusCode = 500
    resp.statusMessage = err
    console.log("catch(err) = " + err)
    resp.json()
  }

})




router.post('/executeUpdate', (req, resp) => {
  console.log('executeUpdate called')
  console.log(req.body.query);
  const update = req.body.query;
  try {
    connection.execute(update, function (err, rows) {
      if (err) {
        console.log("if(err) = " + err)
        resp.statusCode = 500
        resp.statusMessage = err
        resp.json()
      } else {
        resp.contentType('application/json')
        resp.statusCode = 200
        resp.json(rows)

      }
    })
  } catch (err) {
    resp.statusCode = 500
    resp.statusMessage = err
    console.log("catch(err) = " + err)
    resp.json()
  }

})


router.post('/makeConnection', (req, resp) => {
  console.log('makeConnection called')
  console.log(req.body);
  let newconfig = {};
  newconfig = {
    contactPoints: [req.body.connection.contactPoints],
    keyspace: req.body.connection.keyspace,
    port: req.body.connection.port,
    localDataCenter: 'datacenter1'
  }
  let authProvider
  if (req.body.connection.uid !== undefined && req.body.connection.pwd !== undefined) {
    authProvider = new cassandra.auth.PlainTextAuthProvider(
      req.body.connection.uid, req.body.connection.pwd);
    newconfig = {
      ...newconfig,
      authProvider: authProvider,
    }
  }
  console.log(newconfig);

  connection = new cassandra.Client(newconfig)
  try {
    ConnectToDB(connection, resp)
  } catch (e) {
    console.log(e)
  }
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
export default app;
// app.listen(5000);
