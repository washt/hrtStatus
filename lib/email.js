'use strict';

module.exports = function (transporter,view) {

	transporter.sendMail(view, function(err, info){
		if(err){
			return console.log(error);
		}

		console.log('Message sent: ' + info.response);

	});

};

