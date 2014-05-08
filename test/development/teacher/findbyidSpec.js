"use strict";


describe('Company model', function() {
    
	

	var mongoose = require("mongoose");

	var util = require("util");
	
    var dbModule = require('../../testDbSetup.js');

    
    var Staff = require("../../../models/staff.js").Staff;

    var completed;
	

    function toObjectId(id) {
	return mongoose.Types.ObjectId(id);
    }

    
    it('exists', function() {

        expect(Staff).toBeDefined();
       // expect(Staff instanceof Function).toBeTruthy();
    });


    describe('Functions', function() {
		
        beforeEach(function() {
            dbModule.open();
            completed = false;
        });

        afterEach(function() {
            dbModule.close();
        });
        
        var staff = new Staff();
		var staffReady = true;
 //       var _id = toObjectId('5289d195d10dd70200000002');
        var _id = toObjectId('528f0136ca9e300200000001');
        //var _id = toObjectId('526be2621ac24a020000000f');
		it ('can get', function() {
			waitsFor(function() {
				return staffReady;
			}, 'Waiting for staff timed out', 5000);
			
			var getResult;
			runs(function() {
				staff.get(_id, function(e) {
					console.log('get completed');
					console.log(e);
					getResult = e;
					completed = true;
				});
			});
			
			waitsFor(function() {
				return completed;
			}, 'Waiting for staff to get timedout', 10000);
			
			runs(function() {
				console.log('get result');
				console.log(getResult);
			});
		});
    });
});