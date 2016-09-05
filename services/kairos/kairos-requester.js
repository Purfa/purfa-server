'use strict';

const request = require('superagent');
const Promise = require('bluebird');
const configuration = require('./config');

const BASE_URL = 'https://api.kairos.com'

// ----------------------------------------
// 					Utils
// ----------------------------------------
const prepareRequest = (kairosRequest) => {
	return kairosRequest
		.set('Content-Type', 'application/json')
		.set('app_id', configuration.KAIROS_APP_ID)
		.set('app_key', configuration.KAIROS_KEY);
};

const postRequest = (endpoint, params) => {
	let rawRequest = request.post(BASE_URL + endpoint);
	if (params) {
		rawRequest = rawRequest.send(params);
	}

	return prepareRequest(rawRequest);
};

const buildRequestPromise = (endpoint, params) => {
	return new Promise((resolve, reject) => {
		postRequest(endpoint, params)
			.end((error, response) => {
				if (error) {
						console.log('KAIROS ERROR');
						reject(error);
					} else {
						console.log(response);

						const responseJSON = JSON.parse(response.text);
						if (responseJSON) {
							resolve(responseJSON);
						} else {
							reject({
								"code": "INTERNAL_SERVER_ERROR",
								"message": "Error en consulta de Kairos"
							});
						}
					}
			});
	});
};

// ----------------------------------------
// 				  Endpoints
// ----------------------------------------

/**
	Devuelve una promise que contiene todas las personas registradas
	en Kairos.
*/
module.exports.getAllPeople = (_gallery) => {
	let gallery = "admin";
	if (_gallery) {
		gallery = _gallery;
	}

	return buildRequestPromise('/gallery/view', {
			"gallery_name": gallery
		})
		.then((response) => {
			return new Promise((resolve, reject) => {
				resolve(response.subject_ids);
			});
		});
};


/**
	Elimina una persona registrada en una galeria de kairos.
*/
module.exports.removePerson = (personName, galleryName) => {

	if(!personName) {
		return new Promise((resolve, reject) => {
			reject({
				"code": "CLIENT_ERROR",
				"message": "El nombre de la persona es requerido (nombre del parametro: person_name)"
			});
		});
	}

	let _galleryName = "admin";

	if (galleryName) {
		_galleryName = galleryName;
	}

	return buildRequestPromise('/gallery/remove_subject', {
		"gallery_name": _galleryName,
		"subject_id": personName
	});
};

/**
	Devuelve una promise que contiene todas las galerias registradas
	en Kairos.
*/
module.exports.getAllGalleries = () => {
	return buildRequestPromise('/gallery/list_all')
		.then((response) => response.gallery_ids);
};

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

	return buildRequestPromise('/enroll', requestParams);
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
			.post(BASE_URL + '/recognize')
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

					console.log("RESPONSE JSON => " + JSON.stringify(responseJSON));

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