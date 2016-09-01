'use strict';

const router 					= require('express').Router();

const User 						= require('../model/User');
const Photo 					= require('../model/Photo');

const kairosRequester 			= require('../services/kairos/kairos-requester');

// Endpoints
const enrollEndpointRouter 		= require('./endpoints/enroll');
const loginEndpointRouter 		= require('./endpoints/login');
const recognizeEndpointRouter	= require('./endpoints/recognize');
const registerEndpointRouter	= require('./endpoints/register');


// --------------------------------------------------
// SETUP
// --------------------------------------------------

router.use('/enroll'	, enrollEndpointRouter);
router.use('/login'		, loginEndpointRouter);
router.use('/recognize'	, recognizeEndpointRouter);	
router.use('/register'	, registerEndpointRouter);

router.get('/test', (req, res) => {
	res.send('holi');
});	

module.exports = router;