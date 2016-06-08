'use strict'

const emailTemplates = module.exports = {

	headers (config) {
		return {
			from    : config['sender_name'] + ' <' + config['sender'] + '>',
			to      : config['receiver'],
			subject : 'HRT Bus App Feed Error',
			html    : '<b>The feed is only returning headers.Fix it!<br><br>- HRTBus App Bot</b>',
		}
	}

	sitedown (config) {
		return {
			from    : config['sender_name'] + ' <' + config['sender'] + '>',
			to      : config['receiver'],
			subject : 'HRT Bus App Feed Error',
			html    : '<b>The feed is down.Fix it!<br><br>- HRTBus App Bot</b>',
		}
	}

	stale (config) {
		return {
			from    : config['sender_name'] + ' <' + config['sender'] + '>',
			to      : config['receiver'],
			subject : 'HRT Bus App Feed Error',
			html    : '<b>The feed is stale.Fix it!<br><br>- HRTBus App Bot</b>',
		}
	}
}
