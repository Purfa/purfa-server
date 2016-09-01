'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const image = req.body.image;

	if(!image) {
		res.status(400).json({
			"code": "REQUIRED_ARGUMENTS",
			"message": "Image param is required in order to recognize a face. It should be a base64 string."
		});	
		return;
	}

	if(typeof image != 'string') {
		res.status(400).json({
			"code": "INVALID_ARGUMENTS",
			"message": "Image param should be a base64 string."
		})
		return;
	}

	kairosRequester
		.recognize(image, 'admin')
		.then((response) => {
			res.status(200).json({
				"code": "SUCCESS",
				"data": response
			});
		});	
});

module.exports = router;