'use strict';

const router 					= require('express').Router();

const User 						= require('../model/User');
const Photo 					= require('../model/Photo');

const kairosRequester 			= require('../services/kairos/kairos-requester');

// Endpoints

const loginEndpointRouter 			= require('./auth/login');
const registerEndpointRouter		= require('./auth/register');

const peopleEndpointRouter 			= require('./face-recognition/people');
const galleriesEndpointRequester	= require('./face-recognition/galleries');
const recognizeEndpointRouter		= require('./face-recognition/recognize');


// --------------------------------------------------
// SETUP
// --------------------------------------------------

// Auth
router.use('/login'		, loginEndpointRouter);
router.use('/register'	, registerEndpointRouter);

// Face recognition
router.use('/people'	, peopleEndpointRouter);
router.use('/galleries'	, galleriesEndpointRequester);
router.use('/recognize'	, recognizeEndpointRouter);	

router.get('/test', (req, res) => {
	res.json({
		"Hola": "Mundo"
	});
});	

module.exports = router;