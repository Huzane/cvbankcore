describe("Profile Load Tests", function(){
    var dbModule = require('../../testDbSetup.js');
    var completed, result;
    var profile = require("../../../lib/school/newAccount.js");
    profile.on('complete', function(data) {
        console.log('Completed with data');
        console.log(data);
       result = data;
       completed = true;
    });
    beforeEach(function() {
        dbModule.open();
        completed = false;
    });

    afterEach(function() {
        dbModule.close();
    });  
    it("exist", function(){
        expect(profile instanceof Object).toBeTruthy();
    })
    it("can verify", function(){
        runs(function() {
        var logo = 'logo.png';
        var shortName = 'gamakosi';
        var longName ='gamako';
        var address ='ikorodu lagos';
        var website ='www.lsinuxfest.com';
        var phone = '07031285559';
        var sector = 'info-technology';
        var email ='daserlinux@gmail.com';
        var firstName = "Daser";
        var lastName = "David";
        var options = {
            logo:logo,
            shortName : shortName,
            longName : longName,
            address : address,
            website : website,
            phone : phone,
            sector : sector,
            email: email,
            firstName : firstName,
            lastName : lastName
        };
           profile.bootStrap(options); 
        });
        
        waitsFor(function() {
            return completed;
        }, 'loading profile timedout', 6000);
        
        runs(function() {
           expect(result).toBeDefined();
           expect(result.accountId).toBeDefined();
           expect(result.schoolId).toBeDefined();           
         //  expect(result.data).toBeDefined();
           
        });
    });
});