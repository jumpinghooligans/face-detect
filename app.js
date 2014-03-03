
/**
 * Module dependencies.
 */

require('./db.js')

var express = require('express');

var routes = require('./routes');

var face = require('./routes/face');

var http = require('http');
var path = require('path');

var app = express();


/*
 * reKognition API variables
 */
global.api_key = "zToF10gKy1DiD39T";
global.api_secret = "CHuDFC9Acnop7n3W";
global.api_url = "https://rekognition.com/func/api/";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/face', face.index);

app.get('/face/add', face.add);
app.post('/face/add', face.add);

app.get('/face/train', face.train);
app.post('/face/train', face.train);

app.get('/face/recognize', face.recognize);
app.post('/face/recognize', face.recognize);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
