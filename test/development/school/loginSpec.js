var frisby = require('frisby');
var URL = 'http://cvbankcore.herokuapp.com';



frisby.create('Ensure response has proper JSON types in specified keys')

.get(URL + '/school/login')
    .expectStatus(200)
    
.post(URL + '/school/login', {
      identity: "daser",
      password: "bar",
    })
    .expectStatus(200)
.toss();