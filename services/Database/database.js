'use strict';

const mongoose = require('mongoose');

const configuration = require('./database-config');

module.exports.configure = () => {
	mongoose.connect(configuration.MONGO_DB_URI);

	const db = mongoose.connection;

	db.on('error', (error) => {
		console.log('Error while connecting to database: ' + error);
	});	

	db.once('open', () => {
		console.log('Successfuly connected to database');
	});	
};	