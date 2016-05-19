'use strict';

var assert = require('assert'),
	  hrtStatus = require('../hrtStatus.js'),


describe('HRTStatus', function() {
  describe('authentication', function () {
    it('should successfully authenticate with gmail', function () {
			var transporter = nodemailer.createTransport(config['mailauth'])

		  assert.equal(transporter,true);	
    });
  });
  describe('feed quality', function () {
		it('detect a stale feed', function () {
		  assert.equal(1,2);	
		});
		it('detect an empty feed', function () {
		  assert.equal(1,2);	
		});
		 it('detect an fresh feed', function () {
		  assert.equal(1,2);	
		});
 });
  describe('modules', function () {
    it('should successfully load dependencies', function () {
		  assert.equal(1,2);	
    });
  });

});
