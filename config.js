'use strict'

var moment = require('moment')

const TIME        = moment().format('h:mm:ss') ,
      NEWFILE     ='logs/hrtrtf_'+ moment().format('h:mm:ss') + '.txt',
      SENDER      = 'YOUR_EMAIL',
			PASS        = 'YOUR_PASS_HERE',
      SENDER_NAME = 'HRT Bus Status Bot',
      RECEIVER    = 'DEST_EMAIL',
      IP          = '216.54.15.3',
      FILEPATH    = 'Anrd/hrtrtf.txt',
      SERVICE     = 'Gmail';

module.exports = {

    time        : TIME,
		newfile     : NEWFILE,
		sender      : SENDER,
		sender_name : SENDER_NAME,
		receiver    : RECEIVER,
		IP          : IP,
		filepath    : FILEPATH,
    mailauth    : {
			              service: SERVICE,
										auth: { user: SENDER, pass: PASS },
										secure: true
		              }
}
