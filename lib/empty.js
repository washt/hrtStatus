'use strict';

var fs = require('fs')

const EmptyFeed = 

	/*
	* Read the files from the log dir
	* Return true if the log is empty
	* Return false if the log contains 1 or more file
	*/

	fs.readdir('logs/', (err, files) => {
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

module.exports = EmptyFeed
