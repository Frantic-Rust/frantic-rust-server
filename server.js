var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./Server/routes.js')(app, express);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('Roam listening on port 3000!');
});

module.exports = app;
