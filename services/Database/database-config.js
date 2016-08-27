'use strict';

const configuration = {};

configuration.MONGO_DB_URI = (() => {
	const USER = 'ruloagusfer';
	const PASSWORD = 'pitusa27';

	return 'mongodb://' + USER + ':' + PASSWORD + '@ds017726.mlab.com:17726/soa-project';
})();

module.exports = configuration;