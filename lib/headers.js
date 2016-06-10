'use strict';

var fs = require('fs')

const Headers = 

//read the files from the log dir
fs.readdir('logs/', (err, files) => {

	if (err) throw err
	//If only header in last sync, notify
	fs.stat('logs/' + files[files.length -1], (err,stats) => {
		
		if (err) throw err
		
		if (stats.size == 107) {

			console.log("Error: Most recent pull only returned header")
			return true
		}

		else {

			return false
		}
	})
})

module.exports.headers = Headers 
