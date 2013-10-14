describe("Profile Load Tests", function(){
    var dbModule = require('../../testDbSetup.js');
    var completed, result;
    var profile = require("../../../lib/authentication/accountProfile.js");
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
           profile.bootStrap('badghget@gmail.com', 'MZ1U20Ou'); 
        });
        
        waitsFor(function() {
            return completed;
        }, 'loading profile timedout', 6000);
        
        runs(function() {
           expect(result).toBeDefined();
           expect(result.status).toBeDefined();
           expect(result.data).toBeDefined();
           
        });
    });
});