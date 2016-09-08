'use strict';

const Promise = require('bluebird');
const fileSystem = Promise.promisifyAll(require('fs'));

module.exports.saveImage = (image, path) => {
	return fileSystem
		.writeFileAsync(path, image, 'base64')
};	

module.exports.saveTextField = (contents) => {
	fileSystem.writeFileAsync('./justATest.txt', contents, {}).then(function() {
	    console.log("succesfully written");
	});	
};	