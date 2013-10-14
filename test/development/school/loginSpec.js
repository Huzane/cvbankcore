var frisby = require('frisby');
var URL = 'http://cvbankcore.herokuapp.com';



frisby.create('Ensure response has proper JSON types in specified keys')

//.get(URL + '/school/login')
//    .expectStatus(200)
    
.post(URL + '/school/login', {
      identity: "badghget@gmail.com",
      password: "MZ1U20Ou"
    })
    .expectStatus(200)
 //   .expectBodyContains('yeso')
//   .expectJSONTypes({
//      status: String,
//      message: String
//    })
     .inspectJSON()
.toss();