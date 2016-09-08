'use strict';

const Promise 			= require('bluebird');
const configuration 	= require('./image-storage-config');
const cloudinary 		= require('cloudinary');



module.exports.configure = () => {
	cloudinary.config({ 
		cloud_name 	: configuration.CLOUD_NAME, 
		api_key 	: configuration.API_KEY, 
		api_secret 	: configuration.API_SECRET
	});
};

module.exports.upload = (image) => {
	

	
	cloudinary.uploader.upload("my_picture.jpg", (result) => { 
		console.log(result) 
	});
};	