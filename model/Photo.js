'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

const photoSchema = mongoose.Schema({
	contents	: String
});


photoSchema.methods.save = () => {
	const _this = this;
	return new Promise((resolve, reject) => {
		_this.save((error) => {
			if(error) {
				reject(error)
			} else {
				resolve();
			}
		})
	});	
}

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;