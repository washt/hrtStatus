'use strict';

var fs = require('fs');
var ftp = require('ftp');
var moment = require('moment');

var time = moment().format('h:mm:ss');
var newfile = 'logs/hrtrtf_'+ time + '.txt';

// fetch the latest hrtbus data
var ftp = new ftp();
ftp.on('ready', () => {
	ftp.get('Anrd/hrtrtf.txt', (err, stream) => {
		if (err) throw err;
		stream
		  .once('close',() => {ftp.end();})
		    .pipe(fs.createWriteStream(newfile));
	});
}).connect({host : '216.54.15.3'});

//read the files from the log dir
fs.readdir('logs/', (err, files) => {
	if (err) throw err;

	if (files[files.length -1] == undefined) {
		console.log("Error No File Found");
	};

	files.forEach((filename) => {
		fs.stat('logs/' + filename, (err,stats) => {
			if (err) throw err;
		  //If only header in last sync, notify
			if (stats.size == 107) {
				//console.log(filename);	
			};
		}); 
	});

	// maintain a queue of 6 files
	if(files.length > 5) {
		fs.unlinkSync('logs/' + files[0]);
	};
  console.log(files);
});

