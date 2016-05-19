'use strict';

var fs = require('fs'),
config = require('./config.js'),
views = require('./views')

//read the files from the log dir
//return true if the log is empty
//return false if the log contains 1 or more file
module.exports = fs.readdir('logs/', (err, files) => {
	if (err) throw err

	if (files[files.length -1] == undefined) {
		console.log("Error: No File Found");
		// send mail with defined transport object 
		return true

		}
  else {
		return false
	}
	
});

