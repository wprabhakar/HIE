var FS = require('fs');
var nodemailer = require('nodemailer');
var sPassword = FS.readFileSync('/Credentials/gmail.txt'); // get private key
var sFromEmail = 'enquiry@haveitearly.com';

function handler(req, res, m) {
  var template = "templates/PasswordReset.html";
  var sTemplateContent = FS.readFileSync(template, 'utf8');    
  var o = m.toObject().result ;
  console.log ( "Mdd => " + JSON.stringify ( o )) ;
  Object.keys(o[0]).forEach(function (key) {
    sTemplateContent = replaceAll(sTemplateContent, "@" + key + "@", o[0][key]);
  });
  console.log ( sTemplateContent ) ;
  // any options can be set here...
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: sFromEmail,
      pass: sPassword
    }
  });
  transporter.sendMail({
    from: sFromEmail,
    to: o[0].EMAIL,
    subject: "Your password reset request",
    //    text: 'This is sample text for the email',
    html: sTemplateContent
  }, function (error, response) {
    if (error) {
//      console.log('Failed in sending mail');
      console.dir({ success: false, existing: false, sendError: true });
      console.dir(error);
      res.end({'success' : false, 'EMAIL' : o[0].EMAIL});
    } else {
//      console.log('Successful in sedning email');
      console.dir({ success: true, existing: false, sendError: false });
      console.dir(response);
      res.end({'success' : true, 'EMAIL' : o[0].EMAIL});
    }
  });
}

module.exports = function (module_holder) {
  module_holder['gmailer'] = handler;
}
