describe("Profile Load Tests", function(){
    var dbModule = require('../../testDbSetup.js');
    var completed, result;
    var profile = require("../../../lib/staff/newAccount.js");
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
        var firstName = 'Sandra';
        var lastName ='Danboyi';
        var middleName ='Timbyen';
        var address ='Kwata staff training Jos';
        var phone ='www.sandycool.com';
        var email ='timbyendanboyi@gmail.com';
        var schoolID = "525fbbf09a7409fd5f000001";

        var options = {
            firstName : firstName,
            lastName : lastName,
            middleName : middleName,
            address : address,
            phone : phone,
            email: email,
            schoolID : schoolID
        };
           profile.bootStrap(options); 
        });
        
        waitsFor(function() {
            return completed;
        }, 'loading profile timedout', 6000);
        
        runs(function() {
           expect(result).toBeDefined();
           expect(result._id).toBeDefined();
         //  expect(result.schoolId).toBeDefined();           
         //  expect(result.data).toBeDefined();
           
        });
    });
});