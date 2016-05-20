'use strict';

var _ = require('lodash'),
   fs = require('fs'),
  ftp = require('ftp'),
moment = require('moment'),
nodemailer = require('nodemailer'),
config = require('./config.js'),
views = require('./views');

var transporter = nodemailer.createTransport(config['mailauth']);

// fetch the latest hrtbus data
var ftp = new ftp();
ftp.on('ready', () => {
	ftp.get(config['filepath'], (err, stream) => {
		
		if (err) throw err;

		stream.once('close',() => {ftp.end();})
		        .pipe(fs.createWriteStream(config['newfile']));
	});
}).connect({host : config['IP']});

//read the files from the log dir
fs.readdir('/home/twash/hrtStatus/logs/', (err, files) => {
	if (err) throw err;

	if (files[files.length -1] == undefined) {
		console.log("Error: No File Found");
		// send mail with defined transport object 
		transporter.sendMail(sitedown, function(err, info){
			if(err){
				return console.log(error);
			}

			console.log('Message sent: ' + info.response);

		});

	};

	//If only header in last sync, notify
	fs.stat('/home/twash/hrtStatus/logs/' + files[files.length -1], (err,stats) => {
		
		if (err) throw err
		
		if (stats.size == 107) {
			console.log("Error: Most recent pull only returned header");
			// send mail with defined transport object 
			transporter.sendMail(headers, function(error, info){
				if(error){
					return console.log(error);
				}

				console.log('Message sent: ' + info.response);

			});
		}
	});

	//If file size hasn't changed for 5 consecutive  pulls, assume stale feed
	fs.readFile('/home/twash/hrtStatus/logs/' + files[files.length -1],'utf8', (err, data) => {

		if (err) throw err;

		var lasttimestamp = moment(data.slice(data.length - 50,data.length -42),
															"hh:mm:ss").fromNow();
		if (lasttimestamp[0] > 10) {
			console.log("Stale Feed");
			transporter.sendMail(stale, function(error, info){
				if(error){
					return console.log(error);
				}

				console.log('Message sent: ' + info.response);

			});
		}
		else { 
			console.log("Feed Ok")
		}
}); 

	// maintain a queue of 10 files, moving oldest file into archive
	if(files.length > 10) {
		fs.renameSync('/home/twash/hrtStatus/logs/' + files[0],'/home/twash/hrtStatus/archive/' + files[0]);
	};
  //console.log(files);
});

process.on('uncaughtException', function(err) {
	console.log(err);


});
