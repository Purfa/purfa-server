'use strict';

const Promise 			= require('bluebird');
const configuration 	= require('./image-storage-config');
const cloudinary 		= require('cloudinary');
const fileSystem		= require('../file-system/file-system');


module.exports.configure = () => {
	cloudinary.config({ 
		cloud_name 	: configuration.CLOUD_NAME, 
		api_key 	: configuration.API_KEY, 
		api_secret 	: configuration.API_SECRET
	});
};

const upload = (image) => {
	return new Promise((resolve, reject) => {		
		cloudinary.uploader.upload(image, (result) => { 
			const url = result.url;

			if(!url) {
				reject({
					"code": "IMAGE_UPLOAD_FAIL"
				});
			} else {
				resolve(url);	
			}
		});
	});
};	

module.exports.upload = upload;


module.exports.saveImage = (image, path) => {
	return fileSystem
		.saveImage(image, path)
		.then(() => {
			return upload(path);
		})
}