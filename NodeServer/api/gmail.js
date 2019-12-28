var jwt = require('../node_modules/jsonwebtoken');
var Firebird = require('../node_modules/node-firebird');
var Map = require("../node_modules/collections/map");
var FastMap = require("../node_modules/collections/fast-map");
var _check = require('../node_modules/check-types');

var bDebug = true;

function handler(oTo, oSubject, oBody, func) {
  var encodedMail = new Buffer(
    "Content-Type: text/plain; charset=\"UTF-8\"\n" +
    "MIME-Version: 1.0\n" +
    "Content-Transfer-Encoding: 7bit\n" +
    "to: " + oTo + "\n" +
    "from: haveitearly@gmail.com\n" +
    "subject: " + oSubject + "\n\n" +

    "" + oBody
  ).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

  request({
    method: "POST",
    uri: "https://www.googleapis.com/gmail/v1/users/me/messages/send",
    headers: {
      "Authorization": "Bearer 'access_token'",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "raw": encodedMail
    })
  },
    function (err, response, body) {
      if (err) {
        console.log(err); // Failure
      } else {
        console.log(body); // Success!
      }
    });
}

module.exports = function ( module_holder ) {
  module_holder [ 'gmail' ] = handler ;
}
