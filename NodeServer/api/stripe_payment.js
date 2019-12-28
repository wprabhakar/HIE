var Stripe = require('stripe');
var FS = require('fs');
var PATH = require('path');
var BASE_DIR = PATH.dirname(process.argv[1]);
var CONFIG = require(BASE_DIR + '/config');
var eSQL = require(BASE_DIR + "/eSQL");

module.exports = function (app, pool) {
  console.log("Loading stripe_payment.js " + CONFIG.stripeSecretKey);
  var stripe = require("stripe")(CONFIG.stripeSecretKey);

  app.post('/stripe/payment/:lid/:amount', function (req, res) {
    console.log("Body: " + JSON.stringify(req.body));
    var token = req.body.token;
    var amount = req.params.amount;
    var iUserID = req.params.lid;
    var oItems = req.body.items;
    var applicationFee = 0;
    var oAccount = "";
    var sql = "SELECT FIRST 1 Description Account FROM ConfigDB where Name = 'StripeAccount'";
    eSQL(pool, sql, req, function (m) {
      oAccount = m.get('result')[0].ACCOUNT;

      var sql = "INSERT INTO Transaction ( CUser_ID, AmountPaid )" +
        " values ( " + iUserID + "," + (amount / 100.00) + ") returning ID, BOOKINGREF";
      var customerOrderID = 0;
      var bookingRef = "BREF";
      console.log("Executing: " + sql);
      eSQL(pool, sql, req, function (m) {
        console.log(m);
        customerOrderID = m.get('result')[0].ID;
        bookingRef = m.get('result')[0].BOOKINGREF;
        console.log(customerOrderID);

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
      });
    });
  });
}
