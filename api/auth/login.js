'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../model/User');

router.post('/', (req, res) => {
	console.log('WE ARE HERE');

	res.json({
		"first_name": "Nahuel",
		"last_name": "Roldan"
	});	

	return;
});	

module.exports = router;