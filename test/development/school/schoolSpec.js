"use strict";


describe('School model', function() {
    
	

	var mongoose = require("mongoose");

	var util = require("util");
	
    var dbModule = require('../../testDbSetup.js');

    var School = require("../../../models/school.js").School;

    var AS = require("../../../models/account.js").Account;
    
    var completed;
	var AScompleted;
	
    
    it('exists', function() {

        expect(School).toBeDefined();
        expect(School instanceof Function).toBeTruthy();
        //expect(AS).toBeDefined();
    });


    describe('Functions', function() {
		
        beforeEach(function() {
            dbModule.open();
            completed = false;
            AScompleted = false;
        });

        afterEach(function() {
            dbModule.close();
        });
        
        var school = new School();
        var logo = 'logo.png';
        var shortName = 'dasersoft3';
        var longName ='softwaretech';
        var address ='ikorodu lagos';
        var website ='www.linuxfest.com';
        var phone = '07031285559';
        var sector = 'information technology';
        var email ='badghget@gmail.com';
        var schoolObject;
		var schoolReady = false;
		var activationObject;
		var activationReady;
		
		it ('can create', function() {
			runs(function() {
				school.create({
					shortName : shortName,
					longName : longName,
					address : address,
					website : website,
					phone : phone,
					email : email
				}, function(c) {
					schoolObject = c;
					schoolReady = true;
					completed = true;
				});
			});
			
			
			waitsFor(function() {
				return completed;
			}, 'Waiting for school create timedout', 5000);
			
			
			runs(function() {
				expect(schoolObject).toBeDefined();
				expect(schoolObject._id).toBeDefined();
				console.log('School created');
				console.log(schoolObject);
			});
		});
		
		it('can create account', function(){
		   runs(function(){
		       var status = 'activation';
		        var acct = new AS();
                acct.create({identity: email, status:status , accountType: 'school' }, function(c) {
					activationObject = c;
					activationReady = true;
					AScompleted = true;
				});
		   }) ;
			waitsFor(function() {
				return AScompleted;
			}, 'Waiting for activation create timedout', 5000);
			
			
			runs(function() {
				expect(activationObject).toBeDefined();
				expect(activationObject._id).toBeDefined();
				console.log('Activation created');
				console.log(activationObject);
			});

		});

		
/*		it ('can delete', function() {
			waitsFor(function() {
				return schoolReady;
			}, 'Waiting for company timedout', 5000);
			
			var deleteResult;
			runs(function() {
				company.hardDelete(companyObject._id, function(e) {
					console.log('Delete completed');
					deleteResult = e;
					completed = true;
				});
			});
			
			waitsFor(function() {
				return completed;
			}, 'Waiting for company to delete timedout', 10000);
			
			runs(function() {
				console.log('Delete result');
				console.log(deleteResult);
			});
		});
*/
    });
});