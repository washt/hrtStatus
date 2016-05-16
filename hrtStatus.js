'use strict';

var _ = require('lodash'),
   fs = require('fs'),
  ftp = require('ftp'),
moment = require('moment'),
nodemailer = require('nodemailer');

var time = moment().format('h:mm:ss'),
    newfile = 'logs/hrtrtf_'+ time + '.txt',
		sender_name = "HRT Bus Status Bot",
		sender = "test@gmail.com",
		_pass = 'test',
		receiver = "test@gmail.com",
		IP = '216.54.15.3',
		filepath = 'Anrd/hrtrtf.txt';

var authy = {
	service: "Gmail",	
	auth: { user: sender, pass: _pass },
	secure: true
};

var transporter = nodemailer.createTransport(authy);

var mailOpts = {
	from: sender_name + " <" + sender + ">" ,
	to: receiver,
	subject: 'HRT Bus App Test',
	html: '<b>Testing test </b>'
};

// send mail with defined transport object 
transporter.sendMail(mailOpts, function(error, info){
	if(error){
		return console.log(error);
	}
	console.log('Message sent: ' + info.response);
});

// fetch the latest hrtbus data
var ftp = new ftp();
ftp.on('ready', () => {
	ftp.get(filepath, (err, stream) => {
		if (err) throw err;

		stream
		  .once('close',() => {ftp.end();})
		  .pipe(fs.createWriteStream(newfile));
	});
}).connect({host : IP});

//read the files from the log dir
fs.readdir('logs/', (err, files) => {
	if (err) throw err;

	if (files[files.length -1] == undefined) {
		console.log("Error: No File Found");
	};

	//If only header in last sync, notify
	fs.stat('logs/' + files[files.length -1], (err,stats) => {
		//if err throw err;
		if (stats.size == 107) {
			console.log("Error: Most recent pull only returned header");
		}
	});

	//If file size hasn't for 5 consecutive  pulls, assume stale feed
	fs.readFile('logs/' + files[files.length -1],'utf8', (err, data) => {
		if (err) throw err;
		var lasttimestamp = moment(data.slice(data.length - 50,data.length -42),
															"hh:mm:ss").fromNow();
		if (lasttimestamp[0] > 10) {
			console.log("Stale Feed");
		}
	}); 

	// maintain a queue of 6 files
	if(files.length > 5) {
		fs.unlinkSync('logs/' + files[0]);
	};
  console.log(files);
});
