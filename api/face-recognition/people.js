'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../model/User');
const Photo = require('../../model/Photo');
const kairosService = require('../../services/kairos/kairos-requester');


/**
	/people es un recurso que simboliza a las personas admitidas a entrar.

	Dentro de un recurso tenemos acciones que podemos ejecutar sobre ese recurso.

	Entonces por ejemplo, en el caso de /people podemos ver que personas estan integrando
	el grupo de personas admitidas a entrar por la puerta.

	Para este caso particular tenemos las siguientes acciones:

	- GET => Devuelve las personas admitidas a entrar
	- POST => Enroll de una persona
	- DELETE => Des-enroll de una persona
*/

router.get('/', (req, res) => {
	kairosService
		.getAllPeople()
		.then((response) => {
			res.status(200).send(response);
			return;
		})
		.catch((error) => {
			res.status(500).send(error);
			return;
		});
});

// Esto lo usamos para el enroll.
router.post('/', (req, res) => {
	const photo 		= req.body.image;
	const subjectID 	= req.body.subject_id;
	const galleryName 	= req.body.gallery_name;

	if (!(photo && subjectID && galleryName)) {
		res.status(400).json({
			"code"		: "INVALID_PARAMS",
			"message"	: "image, subject_id and gallery_name are required"
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

// Esto lo usamos para el des-enroll
router.delete('/:subject_id', (req, res) => {
	const subjectID 	= req.params.subject_id;

	if (!(subjectID)) {
		res.status(400).json({
			"code"		: "INVALID_PARAMS",
			"message"	: "subject_id is required"
		});
	}

	kairosService
		.removePerson(subjectID)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

module.exports = router;
