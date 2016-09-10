'use strict';

const request = require('superagent');
const Promise = require('bluebird');
const configuration = require('./config');

const makeRequest = (endpoint) => {
	const BASE_URL = configuration.BASE_URL;
	const URL = BASE_URL + endpoint;
	return request
		.get(URL)
		.query({
			"api_key": configuration.API_KEY,
			"api_secret": configuration.API_SECRET
		});
};


module.exports.detect = (imageURL) => {
	return new Promise((resolve, reject) => {
		makeRequest('/detection/detect')
			.query({ "url": imageURL })
			.end((error, result) => {


				if(error) {
					reject(error);
					return;
				}

				if(!result) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}

				const resultJSON = JSON.parse(result.text);

				if(!resultJSON) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}				

				console.log("DETECTION RESULT => " + result.text);

				const face = resultJSON.face[0];

				if(!face) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}

				const faceID = face.face_id;

				if(!faceID) {
					reject({
						"code": "NO_RESULT"
					});
					return;	
				}

				resolve(faceID);
			});
	});
};



module.exports.addPerson = (personName) => {
	
	return new Promise((resolve, reject) => {
		
		makeRequest('/person/create')
			.query({ 
				"tag": "demotest",
				"person_name": personName,
				"group_name": "Admins"
			})
			.end((error, result) => {
				if(error) {
					resolve({
						"code": "SUCESS"
					});
					return;
				}

				if(!result) {
					reject({
						"code": "NO_RESULT"
					});
				}

				const resultJSON = JSON.parse(result.text);

				if(!resultJSON) {
					reject({
						"code": "NO_RESULT"
					});
				}				
				resolve({
					"code": "SUCESS"
				});
			});
		});
};

/**
	Add face agrega una cara a la base de datos de Face plus plus
*/
module.exports.addFace = (faceID, personName) => {
	return new Promise((resolve, reject) => {
		makeRequest('/person/add_face')
			.query({ 
				"face_id": faceID,
				"person_name": personName
			})
			.end((error, result) => {
				if(error) {
					reject(error);
					return;
				}

				if(!result) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}

				const resultJSON = JSON.parse(result.text);

				if(!resultJSON) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}				

				resolve(resultJSON);
			});
		});
};

// https://apius.faceplusplus.com/v2/train/identify?api_secret=5RepKGhM3aJuZs-Sa8_ZaCQSWsnuLwxU&api_key=47882c5794443f5bd7fbc3ed85882868&group_name=Admins
module.exports.train = () => {
	makeRequest('/train/identify')
		.query({"group_name": "Admins"})
		.end((error, result) => {
			if(error) {
				console.log("Algo salio mal...");
			} else {
				console.log("Se entreno bien.");
			}
		});
};


// https://apius.faceplusplus.com/v2/recognition/identify?url=http%3A%2F%2Fwww.expedientepolitico.com.ar%2Fwp-content%2Fuploads%2Ftinelli-serio.jpg&api_secret=5RepKGhM3aJuZs-Sa8_ZaCQSWsnuLwxU&api_key=47882c5794443f5bd7fbc3ed85882868&group_name=Admins
module.exports.recognize = (imageURL) => {
	return new Promise((resolve, reject) => {
		makeRequest('/recognition/identify')
			.query({"group_name": "Admins", "url": imageURL})
			.end((error, result) => {
				if(error) {
					reject(error);
					return;
				}

				if(!result) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}

				const resultJSON = JSON.parse(result.text);

				if(!resultJSON) {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}				

				const confidence = resultJSON.face[0].candidate[0].confidence;

				if (confidence > configuration.MIN_CONFIDENCE) {
					resolve(resultJSON.face[0].candidate[0].person_name);
					return;
				} else {
					reject({
						"code": "NO_RESULT"
					});
					return;
				}
			});
	});
}




















