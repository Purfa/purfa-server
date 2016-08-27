'use strict';

// --------------------------------------------------
// LIBRARY INCLUDING
// --------------------------------------------------
const express 		= require('express');
const path 			= require('path');
const favicon 		= require('serve-favicon');
const logger 		= require('morgan');
const cookieParser 	= require('cookie-parser');
const bodyParser 	= require('body-parser');



// --------------------------------------------------
// LOCAL DEPENDENCIES
// --------------------------------------------------
const apiRouter 			= require('./api/index');

const imageStorageService 	= require('./services/imageStorage/image-storage');
const databaseService		= require('./services/Database/database');



// --------------------------------------------------
// EXPRESS APPLICATION SETTINGS
// --------------------------------------------------
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// --------------------------------------------------
// SERVICES CONFIGURATION
// --------------------------------------------------
imageStorageService	.configure();
databaseService		.configure();

// --------------------------------------------------
// ROUTES CONFIGURATION
// --------------------------------------------------
app.use('/api/v1', apiRouter);

// --------------------------------------------------
// APP STARTUP
// --------------------------------------------------
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

