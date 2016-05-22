'use strict';

var fs = require('fs')

module.exports = function (config,ftp) {

	// fetch the latest hrtbus data
	var ftp = new ftp();
	ftp.on('ready', () => {
		ftp.get(config['filepath'], (err, stream) => {
			
			if (err) throw err;
			stream.once('close',() => {ftp.end();})
							.pipe(fs.createWriteStream(config['newfile']));

		});

	}).connect({host : config['IP']});

};
