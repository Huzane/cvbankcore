var frisby = require('frisby');
var URL = 'http://cvbankcore.pawn.c9.io';



frisby.create('Ensure response has proper JSON types in specified keys')

.get(URL + '/school/login')
    .expectStatus(200)
    
//.post(URL + '/school/login', {
//      identity: "daser",
//      password: "bar",
//    })
    .expectStatus(200)
.toss();