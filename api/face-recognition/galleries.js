'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../model/User');
const Photo = require('../../model/Photo');
const kairosService = require('../../services/kairos/kairos-requester');

router.get('/', (req, res) => {
	kairosService
		.getAllGalleries()
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

module.exports = router;