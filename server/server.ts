// Get dependencies
import express = require('express');
import http = require('http');
import path = require('path');
import bodyParser = require('body-parser');
import mongoose = require('mongoose')
import configs from './config/config';
import { logErrors, clientErrorHandler, errorHandler } from './api/middlewares/ErrorCatcher';

const config = configs[process.env.NODE_ENV];

// Get our API routes
import api from './api/routes';

// Get express
const app = express();

app.set('trust proxy', 1);

// Connect database (async result handle in the waitfordbconnection function)
mongoose.connect(config.databaseUrl);

// Handles CORS
app.use((req, res, next) => {
  // const allowedOrigins = ['http://localhost:3000', 'http://my-recsys.herokuapp.com'];
  // if (req.headers.origin in allowedOrigins) {
  //   res.header('Access-Control-Allow-Origin', req.headers.origin);
  // }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Location');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

/* Release version */
app.use(express.static(path.join(__dirname, '../../../client/build')));

// Default engine
app.set('view engine', 'html');

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/build/index.html'));
});


// Get port from environment and store in Express
const port = config.serverPort
app.set('port', port);
app.set('host', config.serverHost);

// Create HTTP server instance
const server = http.createServer(app);

// Start server
function startServer() {
  server.listen(port);
}

// Wait for database connection
function waitForDbConnection() {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.on('error', (err) => {
      if (err) {
        reject(`connection error: ${err}`)
      }
    });
    db.once('open', () => resolve());
  });
}

async function init() {
  try {
    startServer();
    await waitForDbConnection();
  } catch (err) {
    console.log(err);
  }
}

init();

// Error handlers, keep it at the end
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


module.exports = server;
