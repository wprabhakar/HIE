var FS = require('fs');
var PATH = require('path');
var sqlString = require('./sqlString');
//https://www.ninjadevs.io/caching-images-in-ionic-2/
var thumb = require('node-thumbnail').thumb;

var bDgbug = true;
var multer = require('multer');
const IMAGE_DIR = '/Images/';
//*
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //    console.log ( "***** File: " + JSON.stringify ( file ) ) ;
    callback(null, IMAGE_DIR);
  },
  filename: function (req, file, callback) {
    //    console.log ( "***** File: " + JSON.stringify ( file ) ) ;
    let sFileName = req.SUB_DIR + '/' + file.fieldname + '-' + Date.now() + PATH.extname(file.originalname);
    //    callback(null, file.fieldname + '-' + Date.now());
    callback(null, sFileName);

  }
});

function createImage(sFileName, height = -1, width = -1) {
  /*
let defaults = {
  prefix: 'thumb_',
  suffix: '',
  digest: false,
  hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512' 
  width: 50,
  concurrency: 1,
  overwrite: true,
  basename: undefined // basename of the thumbnail. If unset, the name of the source file is used as basename. 
};
*/
  var w = width;
  var h = height;
  var sPrefix = h + 'h' + w + 'w_';
  if (w == -1) {
    sPrefix = h + 'h' + '_';
  }
  var sOptions = {
    prefix: sPrefix,
    suffix: '',
    height: h,
    overwrite: true,
    source: IMAGE_DIR + sFileName,
    destination: PATH.dirname(IMAGE_DIR + sFileName),
    concurrency: 2
  }
  if (w != -1)
    sOptions.width = w;
  thumb(sOptions, function (err) {
    console.log('Image Created ' + sPrefix + IMAGE_DIR + sFileName);
  });
}

var upload = multer({ storage: storage }).single('file');
//*/
const bDebug = true;
module.exports = function (app) {
  console.log("Loading image_loader.js");
  app.get('/image/:mid/:name', function (req, res) {
    // if (bDebug)
    //   console.log("In download " + req.url);
    let sID = sqlString("@:mid@", req);
    let sImage = sqlString("@:name@", req);
    var file = IMAGE_DIR + sID + "/" + sImage;
    if (bDebug)
      console.log("Serving: " + file);
    res.download(file);
  });

  //http://nodeexamples.com/2012/09/26/base-64-encoding-images-in-node-js/

  app.post('/api/upload/:mid', function (req, res) {
    req.SUB_DIR = sqlString("@:mid@", req);
    if (!FS.existsSync(IMAGE_DIR + req.SUB_DIR)) {
      if (!FS.existsSync(IMAGE_DIR))
        FS.mkdirSync(IMAGE_DIR);
      FS.mkdirSync(IMAGE_DIR + req.SUB_DIR);
    }
    upload(req, res, function (err) {
      if (err) {
        console.log("Upload Failed: " + err);
        return res.end({ result: 'Error uploading file.' });
      }
      let sFileName = PATH.basename(req.file.filename);
      res.end(sFileName);
      if (bDebug)
        console.log("Upload Success. => " + req.file.filename);
      createImage(req.file.filename, 70, 70);
      createImage(req.file.filename, 156);
    });
  });
}

// module.exports = function(module_holder) {
//      module_holder['image_handler'] = handler;
//  };
