'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../model/User');
const Photo = require('../../model/Photo');
const kairosService = require('../../services/kairos/kairos-requester');

router.post('/', (req, res) => {
	const photo 		= req.body.image;
	const subjectID 	= req.body.subject_id;
	const galleryName 	= req.body.gallery_name;

	if (!(photo && subjectID && galleryName)) {
		res.status(400).json({
			"code"		: "INVALID_PARAMS",
			"message"	: "Photo, subject_id and gallery_name are required"
		});
	}

	kairosService
		.enroll(photo, subjectID, galleryName)
		.then((response) => { 
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
});	

module.exports = router;
