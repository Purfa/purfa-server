'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

const userSchema = mongoose.Schema({
	admin		: Boolean,
	password	: String,
	firstName	: String,
	lastName	: String,
	bio			: String,
	photo 		: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }
});

userSchema.methods.save = () => {
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

const User = mongoose.model('User', userSchema);


module.exports = User;