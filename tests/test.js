'use strict';

var assert = require('assert'),
	  hrtStatus = require('../lib')


describe('HRTStatus', function() {
  describe('authentication', function () {
    it('should successfully authenticate with gmail', function () {
			var transporter = nodemailer.createTransport(config['mailauth'])

		  assert.equal(transporter,true);	
    });
  });
  describe('feed quality', function () {
		it('detect a stale feed', function () {
		  assert.equal(stale,true);	
		});
		it('detect an empty feed', function () {
		  assert.equal(empty,true);	
		});
		 it('detect an fresh feed', function () {
		  assert.equal(fresh,true);	
		});
 });
  describe('modules', function () {
    it('should successfully load dependencies', function () {
			lib = require('../lib')
		  assert.equal(lib,true);	
    });
  });

});
