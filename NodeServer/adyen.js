var adyen = require('node-adyen-cse');
var bDebug = true;

module.exports = function (req, res) {
	var adyenRequestBody = {
		"action" : "Payment.authorise",
		"paymentRequest.merchantAccount" : "Hic2hMerchant",    
		"paymentRequest.amount.currency" : "EUR",
		"paymentRequest.amount.value" : "199",
		"paymentRequest.reference" : "TEST-PAYMENT-" + moment().format(),
		"paymentRequest.shopperIP" : "11.111.111.111",
		"paymentRequest.shopperEmail" : "test@hic2h.com",
		"paymentRequest.shopperReference" : "test-hic2h", 
		"paymentRequest.fraudOffset" : "0",
		"paymentRequest.additionalData.card.encrypted.json" : req.body['adyen-encrypted-data']
	};

	adyen.test("ws@Company.Company", "XXXXXXXXXXXXXXXXX", adyenRequestBody, function(err, response){
		res.json({err: err, response: response});
	});
}

getObjectType = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
/*
module.exports = function ( module_holder ) {
  module_holder [ 'eSQL' ] = handler ;
}
*/
