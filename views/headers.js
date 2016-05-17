'use strict';

var config = require('../config.js')

module.exports = () => {
	return {
		from    : config['sender_name'] + ' <' + config['sender'] + '>',
		to      : config['receiver'],
		subject : 'HRT Bus App Feed Error',
		html    : '<b>The feed is only returning headers.Fix it!<br><br>- HRTBus App Bot</b>',
	}
}
