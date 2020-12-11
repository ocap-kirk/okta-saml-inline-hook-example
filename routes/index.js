var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers['x-okta-verification-challenge']);
  console.log(req.headers);
  res.json({"verification":req.headers['x-okta-verification-challenge']});
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.data);
  
  for(var key in req.body.data.events) {
    if(req.body.data.events.hasOwnProperty(key)){
      //do something with e.g. req.body[key]
      console.log(req.body.data.events[key]);
    }
  }
  // res.json({"error":{
  //   "errorSummary": "We checked the OIDC stuff and it said nope."
  // }});
  console.log(Date.now());
    res.json({
      "commands": [
       {
         "type": "com.okta.assertion.patch",
         "value": [
           {
             "op": "replace",
             "path": "/subject/nameId",
             "value": "replacementValue"
           },
           {
             "op": "add",
             "path": "/claims/foo",
             "value": {
               "attributes": {
                 "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
               },
               "attributeValues": [
                 {
                   "attributes": {
                     "xsi:type": "xs:string"
                   },
                   "value": "barer"
                 }
               ]
             }
           }
         ]
       },
       {
         "type": "com.okta.assertion.patch",
         "value": [
           {
             "op": "replace",
             "path": "/authentication/sessionIndex",
             "value": "definitelyARealSession"
           }
         ]
       }
     ]
   });
  });

module.exports = router;
