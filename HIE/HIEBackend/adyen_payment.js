var FS = require('fs');
var PATH = require('path');
var BASE_DIR = PATH.dirname(process.argv[1]);
var CONFIG = require(BASE_DIR + '/config');
var eSQL = require(BASE_DIR + "/eSQL");
var unirest = require('unirest');

var env = 'UAT' ;
var sPGURL = '' ;

module.exports = function (app, pool) {
  console.log("Loading adyen_payment.js " + CONFIG.adyen.merchantAccount);
  console.log("Loading adyen_payment.js " + CONFIG.adyen[env].merchantAccount);
  console.log("Loading adyen_payment.js " + CONFIG.adyen[env].URL);

  app.post('/api/:lid/pay/:mid/:amt/:pickupon/:pickuptime', function (req, res) {
    //    console.log("Body: " + JSON.stringify(req.body));
    var token = req.body.token;
    var amount = req.params.amt;
    var iUserID = req.params.lid;
    var oItems = req.body.oItems;
    var oPaymentInfo = req.body.oPaymentInfo;
    //    console.log("Items: => " + JSON.stringify(oItems));
    //   console.log("PaymentInfo: => " + JSON.stringify(oPaymentInfo));
    var sql = "INSERT INTO Transaction ( CUsers_ID, MUsers_ID,  AmountPaid, PickUpOn, PickupStart ) values ( @:lid@, @:mid@, @:amt@, '@:pickupon@', '@:pickuptime@' ) returning ID, BOOKINGREF";
    //    console.log("Executing: " + sql);
    eSQL(pool, sql, req, function (m) {
      //      oAccount = m.get('result')[0].ACCOUNT;
      //      var customerOrderID = 0;
      console.log(m);
      //      console.log(customerOrderID);
      var pInfo = {};
      pInfo.bookingRef = m.get('result')[0].BOOKINGREF;
      pInfo.orderID = m.get('result')[0].ID;
      //TODO Adyen Inteface //send data to Adyen
      var oRequest = unirest.post(sPGURL);
      oRequest.auth(CONFIG.adyen.username, CONFIG.adyen.password, true);

      oRequest.headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
      oRequest.send({
        //        "shopperEmail": "s.hopper@test.com",
        //        "shopperReference": "" + iUserID,
        // "recurring": {
        //   "contract": "RECURRING"
        // },
        merchantAccount: CONFIG.adyen.merchantAccount,
        "reference": pInfo.bookingRef,
        "shopperReference": '' + iUserID,
        "amount": {
          "value": amount * 100,
          "currency": "SGD"
        },
        "additionalData": {
          "card.encrypted.json": oPaymentInfo.value
        }
      })
        .end(function (response) {
          var oResult = response.body;
          console.log(oResult);
          console.log(JSON.stringify(oResult));
          if (oResult.resultCode !== 'Authorised') {
            res.send({ result: oResult.resultCode, success: false,message: oResult.refusalReason });
            return;
          }

          /*
          { additionalData: { cardHolderName: 'Balthazar Gronon' },
            pspReference: '8524999248696407',
            resultCode: 'Authorised',
            authCode: '27558' }
          */

          pInfo.charge_id = oResult.pspReference;
          pInfo.name = '1234';
          // sql = "UPDATE Transaction set IsPaymentConfirmed = 'Y', PaymentRef = '" + pInfo.charge_id +
          //   "'" + ", CUSTOMER_NAME = '" + pInfo.name + "' WHERE ID = " + pInfo.orderID + " and BookingRef = '" + pInfo.bookingRef + "'";
          sql = "UPDATE Transaction set IsPaymentConfirmed = 'Y', PaymentRef = '" + pInfo.charge_id +
          "'" + "' WHERE ID = " + pInfo.orderID + " and BookingRef = '" + pInfo.bookingRef + "'";
          eSQL(pool, sql, req, function (m) {
            oItems.forEach(function (o) {
              let oP = o.oProduct;
              sql = "INSERT INTO TransactionDetails ( Transaction_ID, Product_ID, Quantity, Usual_Price, DiscountedPrice )" +
                " values ( " + pInfo.orderID + "," + oP.ID + "," + o.qty + "," + oP.USUAL_PRICE + "," + oP.PRICE + ")";
              eSQL(pool, sql, req, function (m) {
                console.log(m);
              });
            });
            res.send({ result: pInfo });

            /*        
                    var charge = stripe.charges.create({
                      amount: amount, // Amount in cents
                      currency: "sgd",
                      source: token,
                      description: 'HaveItEarly ' + " - " + bookingRef,
                      metadata: { 'order_id': bookingRef },
                      receipt_email: 'test@gmail.com', //UserEmail
                    }, { stripe_account: oAccount }, function (err, charge) {
                      if (err) {
                        console.log(JSON.stringify(err));
                        console.log("Stripe Payment: Error " + err.type);
                        res.status(err.statusCode);
                        res.send(err);
                      }
                      else {
                        console.log(JSON.stringify(charge));
                        console.log("Payment Successful");
                        res.header("Access-Control-Allow-Origin", "*");
                        res.status(200);
                        //TODO Insert into the Order
                        var pInfo = { charge_id: charge.id, 'last4': charge.source.last4, amount: charge.amount, name: charge.source.name };
                        pInfo.customerOrderID = customerOrderID;
                        pInfo.BOOKINGREF = bookingRef;
                        console.log(JSON.stringify(pInfo));
                        sql = "UPDATE Transaction set IsPaymentConfirmed = 'Y', PaymentRef = '" + pInfo.charge_id +
                          "'" + ", CUSTOMER_NAME = '" + pInfo.name + "' WHERE ID = " + customerOrderID + " and BookingRef = '" + bookingRef + "'";
                        eSQL(pool, sql, req, function (m) {
                          //     	 console.log ( m ) ;
                          oItems.forEach(function (o) {
                            let oP = o.oProduct;
                            sql = "INSERT INTO TransactionDetails ( Transaction_ID, Product_ID, Quantity, Price )" +
                              " values ( " + customerOrderID + "," + oP.ID + "," + o.qty + "," + oP.PRICE + ")";
                            eSQL(pool, sql, req, function (m) {
                              //            	 		console.log ( m ) ;
                            });
                          });
                        });
                        res.send(pInfo);
                      }
                    });
            */
          });

        });
    });
  });
}



/*

curl -u "ws@Company.YourCompany":"YourWsPassword" \
   -H "Content-Type: application/json" \
   -X POST \
   --data \
   '{
       "additionalData": {
           "card.encrypted.json":"adyenjs_0_1_4p1$..."
       },
     
       "amount" : {
           "value" : 20000,
           "currency" : "EUR"
       },
     
       "reference" : ["Your Reference Here"],
       "merchantAccount" : ["TestMerchant"]
   }'\
   https://pal-test.adyen.com/pal/servlet/Payment/v25/authorise
*/