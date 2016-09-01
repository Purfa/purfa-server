'use strict';

const request = require('superagent');
const Promise = require('bluebird');
const configuration = require('./config');

const prepareRequest = (kairosRequest) => {
	return kairosRequest
		.set('Content-Type', 'application/json')
		.set('app_id', configuration.KAIROS_APP_ID)
		.set('app_key', configuration.KAIROS_KEY);
}

/**
	Takes a photo and returns the facial features it finds.

	***

	Params:

	- photo: A base 64 image.
	- userName: The name for the user.
	- galleryName: The gallery name in which the photo will be added.
*/
module.exports.enroll = (photo, userName, galleryName) => {
	const requestParams = {
	    "image"			: photo,
	    "subject_id"	: userName,
	    "gallery_name"	: galleryName,
	    "selector"		: "SETPOSE",
	    "symmetricFill"	: "true"
	};

	const enrollRequest =
		request
			.post('https://api.kairos.com/enroll')
			.send(requestParams);

	return new Promise((resolve, reject) => {
		prepareRequest(enrollRequest)
			.end((error, response) => {
				if (error) {
					console.log('ERROR ENROLLING USER');
					reject(error);
				} else {
					console.log(response);
					resolve(response);
				}
			});	
	});
};	

/**
	Takes a photo, finds the faces within it, 
	and tries to match them against the faces 
	you have already enrolled into a gallery.

	***

	Params:

	- photo: A photo object.
	- galleryName: The gallery name in which the photo will be added
*/
module.exports.recognize = (photo, galleryName) => {
	const requestParams = {
	    "image"			: photo,
	    "gallery_name"	: galleryName
	};

	const recognizeRequest =
		request
			.post('https://api.kairos.com/recognize')
			.send(requestParams);

	return new Promise((resolve, reject) => {
		prepareRequest(recognizeRequest)
			.end((error, response) => {
				if (error) {
					reject(error);
				} else if (!response.text) {
					resolve({
						"matches": false
					});
				} else {
					const responseJSON = JSON.parse(response.text);

					if (responseJSON.Errors) {
						resolve({
							"matches": false
						});
						return;
					}

					const firstCandidate = responseJSON.images[0].candidates[0];
					const probabilityToMatch = firstCandidate[Object.keys(firstCandidate)[0]];

					// If probability to match is 0.80 or more than that,
					// then we consider it as a match and the user is allowed.
					const matchCriteria = 0.80;

					if (probabilityToMatch >= matchCriteria) {
						resolve({
							"matches": true,
							"user": Object.keys(firstCandidate)[0]
						});
					} else {
						resolve({
							"matches": false
						});
					}
				}
			});	
	});
};