'use strict';

var _ = require('lodash'),
   fs = require('fs'),
  ftp = require('ftp'),
moment = require('moment'),
nodemailer = require('nodemailer'),
config = require('../config.js'),
views = require('./emailTemplates.js');

//read the files from the log dir
const StaleFeed = fs.readdir('logs/', (err, files) => {

	if (err) throw err;

	//If file size hasn't changed for 5 consecutive  pulls, assume stale feed
	fs.readFile('logs/' + files[files.length -1],'utf8', (err, data) => {

		if (err) throw err;

		var lasttimestamp = moment(data.slice(data.length - 50,data.length -42),
															"hh:mm:ss").fromNow();
		if (lasttimestamp[0] > 10) {
			return true
		}

		else {
			return false
		}

	}); 
});

module.exports = StaleFeed
