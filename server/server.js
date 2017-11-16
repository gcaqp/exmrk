var express = require('express');
var cors = require('cors')
var cache = require('memory-cache');
var bodyParser = require('body-parser')
var storage = require("./src/storage")(cache);
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

  app.use((err, req, res, next) => {
    if (err) {
      res.send('Invalid Request data')
    } else {
      next()
    }
  });

  app.get('/', (req, res) => {
    res.send('Runing gcExam!!') 
  });

  require('./src/app.routes').addRoutes(app, storage);

  app.listen(7777, () => {
    console.log('Examen runing port:7777!')
  })