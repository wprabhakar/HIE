/*

#generate private key  ( output the key file ./private.key )
ssh-keygen -t rsa -b 4096

*/
var FS = require('fs');
var PATH = require('path');
var BASE_DIR = PATH.dirname(process.argv[1]);
var CONFIG = require(BASE_DIR + '/config');
var express = require('express');
var request = require('request');
var app = express();
var compression = require('compression')
var Map = require("collections/map");
var FastMap = require("collections/fast-map");
var properties = require("properties");
var jwt = require('jsonwebtoken');
var Firebird = require('node-firebird');
var bodyParser = require("body-parser");
var responseTime = require('response-time');
var StatsD = require('node-statsd');
var _check = require('check-types');
var https = require('https');
var sqlString = require('./sqlString');
var eSQL = require('./eSQL');
var Adyen = require('./adyen');
var stats = new StatsD();
var oM = new FastMap();
var generator = require('generate-password');


//var options = {};



const bDev = true;
const bDebug = bDev;

//options.host = '127.0.0.1';
//options.port = 3050 ;;
//options.database = 'TA';
//options.user = 'SYSDBA';
//options.password = 'masterkey';
//options.role = null; // default
//options.pageSize = 4096; // default when creating database

var pool = Firebird.pool(CONFIG.poolsize, CONFIG.options);

// Destroy pool
//pool.destroy();

var options = {
  sections: true,
  comments: "#", //Some INI files also consider # as a comment, if so, add it, comments: [";", "#"] 
  separators: "=",
  path: true,
  strict: true
};

reloadProperties = function (bInit) {
  properties.parse("SQLdef.properties", options, function (error, obj) {
    if (error) return console.error(error);
    //    if (bInit && bDebug)
    //      console.log(obj);
    Object.keys(obj).forEach(function (key) {
      var o = oM.get(key);
      if (o == null) {
        if (!bInit && bDebug) {
          console.log("Requires Restart: " + key);
        }
      }
      if (o === obj[key]) {
      }
      else {
        oM.set(key, obj[key]);
        if (!bInit && bDebug)
          console.log("Changed: " + key + " " + obj[key]);
      }
    });

    //    console.log("Obj => " + JSON.stringify(obj));
    //    console.log("OM => " + JSON.stringify(oM));
    if (bInit)
      initRoutes();
  });
}

replaceAll = function (str, find, replace) {
  let r = replace;
  if (replace instanceof Array) {
    console.log(JSON.stringify(replace));
    r = "";
    for (let i = 0; i < replace.length; i++) {
      if (i > 0)
        r += ",";
      r += "'" + replace[i] + "'";
    }
  }
  //  r = replace ;
  var i = str.indexOf(find);
  if (i > -1) {
    str = str.replace(find, r);
    i = i + r.length;
    var st2 = str.substring(i);
    if (st2.indexOf(find) > -1) {
      str = str.substring(0, i) + replaceAll(st2, find, r);
    }
  }
  return str;
}

lookupSQL = function (key) {
  return oM.get(key);
}

ensureAuthorized = function (req, res, next) {
  var bearerHeader = req.headers["ks-x-authorization"];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    //console.log("Client sent token: " + req.token);
    checkUserRole(req, res, next);
  }
  else {
    console.log("Client did not send token: " + bearerHeader);
    res.sendStatus(403);
  }
}

checkUserRole = function (req, res, next) {
  var method = req.method.toLowerCase();
  jwt.verify(req.token, 'mysecret', function (err, decoded) {
    if (err) {
      console.log("FATAL: JWT " + err);
      res.sendStatus(401);
      return;
    }
    var loginID = oM.get("sql.auth.id");
    //    console.log ( loginID + "  " + JSON.stringify ( decoded.data ) ) ;
    if (loginID) {
      if (req.params.lid !== decoded.data[loginID]) {
        console.log("FATAL: Incorrect LoginID ");
        res.sendStatus(401);
        return;
      }
    }
    req.session_data = decoded.data;
    //    console.log(JSON.stringify(decoded));
    var s = "Roles." + method + ".." + req.route.path;
    //    console.log("Role Lookup: " + s);
    var roles = oM.get(s);
    //    console.log("Roles " + roles);
    if (roles) {
      var oRoleLookup = oM.get("sql.auth.role")
      var userRole = decoded.data[oRoleLookup];
      //    console.log("userRole: " + userRole);
      if (roles.indexOf(userRole) > -1)
        next();
      else {
        console.log("Not Authorized: Expected Roles [" + roles + "]");
        console.log("UserRole [" + userRole + "]");
        res.sendSataus(401);
      }
    }
    else
      next();
  });
}

initRoutes = function () {
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (str) {
      return (this.indexOf(str) == 0);
    }
  }

  oM.forEach(function (value, name) {
    var url = "";
    if (name.indexOf("get.") == 0) {
      url = name.substring(4);
      if (bDebug)
        console.log("GET => " + url);
      if (url.startsWith(".")) {
        if (bDebug)
          console.log("Protecting URL " + url);
        app.get(url.substring(1), ensureAuthorized, function (req, res) {
          if (bDebug)
            console.log("*(GET) => " + url.substring(1) + " req: " + req.url);
          //   console.log("Protected GET => " + req.url);
          var sql = lookupSQL("get.." + req.route.path);
          eSQL(pool, sql, req, function (m) { //ADDED Child
            var oARS = m.toObject();
            if (oARS.result.length == 0) {
              res.send(m.toObject());
              return;
            }
            sql = lookupSQL("get.." + req.route.path + "_");
            //      console.log("child **** >>> " + sql);
            // console.log ( "<><><> " + JSON.stringify ( oARS ) ) ;
            if (sql !== undefined || sql != null) {
              var n = oARS.result.length;
              var nTotalResponse = n;
              var response = [];
              for (var i = 0; i < n; i++) {
                eSQL(pool, sql, req, function (mm, oParams) {
                  oParams._D = mm.toObject().result;
                  response.push(oParams);
                  // if (bDebug)
                  //   console.log("ADDED ****>> " + JSON.stringify(oParams));
                  nTotalResponse--;
                  if (nTotalResponse <= 0) {
                    if (bDebug)
                      console.log("Final: " + JSON.stringify(response));
                    res.send({ 'result': response });
                  }
                }, oARS.result[i]);
              }
            }
            else {
              console.log("FINAL ****>>>>" + JSON.stringify(m));
              res.send(m.toObject());
            }
          });
          /*
                    //          console.log("*SQL => " + sql);
                    eSQL(pool, sql, req, function (m)
                    {
                      sql = lookupSQL("get.." + req.route.path + "_");
                      console.log("=>>child " + sql);
                      if (sql !== undefined || sql != null) {
                        var oARS = m.toObject();
                        console.log(JSON.stringify(oARS));
                        var n = oARS.length;
                        for (var i = 0; i < n; i++) {
                          var o = oARS[i];
                          console.log("GET **** >>>> " + JSON.stringify(o));
                          eSQL(pool, sql, req, function (mm) {
                            m[i]._D = mm;
                          }, o);
                        }
                      }
                      res.send(m.toObject());
                    });
          */
        });
      }
      else {
        app.get(url, function (req, res) {
          if (bDebug)
            console.log("(GET) => " + url + " req: " + req.url);
          var sql = lookupSQL("get." + req.route.path);
          if (bDebug)
            console.log("SQL => " + sql);
          eSQL(pool, sql, req, function (m) {
            res.send(m.toObject());
          });
        });
      }
    }
    else
      if (name.indexOf("post.") == 0) {
        url = name.substring(5);
        if (bDebug)
          console.log("POST => " + url);
        if (url.startsWith(".")) {
          if (bDebug)
            console.log("Protecting URL " + url);
          app.post(url.substring(1), ensureAuthorized, function (req, res) {
            if (bDebug)
              console.log("*(POST) => " + url + " req: " + req.url);
            var sql = lookupSQL("post.." + req.route.path);
            if (bDebug)
              console.log("*SQL => " + sql);
            eSQL(pool, sql, req, function (m) { //ADDED Child
              var oARS = m.toObject();
              if (oARS.result.length == 0) {
                res.send(m.toObject());
                return;
              }
              sql = lookupSQL("post.." + req.route.path + "_");
              if (sql !== undefined || sql != null) {
                var n = oARS.result.length;
                var nTotalResponse = n;
                var response = [];
                for (var i = 0; i < n; i++) {
                  eSQL(pool, sql, req, function (mm, oParams) {
                    oParams._D = mm.toObject().result;
                    response.push(oParams);
                    nTotalResponse--;
                    if (nTotalResponse <= 0) {
                      //console.log("FInal: " + JSON.stringify(response));
                      res.send({ 'result': response });
                    }
                  }, oARS.result[i]);
                }
              }
              else {
                //console.log("FINAL ****>>>>" + JSON.stringify(m));
                res.send(m.toObject());
              }
            });
          });
        }
        else {
          app.post(url, function (req, res) {
            if (bDebug)
              console.log("(POST) => " + url + " req: " + req.url);
            var sql = lookupSQL("post." + req.route.path);
            if (bDebug)
              console.log("SQL => " + sql);
            eSQL(pool, sql, req, function (m) {
              res.send(m.toObject());
            });
          });
        }
      }
  });
}

// sign with RSA SHA256
var cert = FS.readFileSync('private.key'); // get private key

//Required to get the POST Body
/*
app.use(bodyParser.urlencoded(
{
  extended: true,
  inflate: true
}));
*/
app.use(bodyParser.json());

var bPerformanceLog = true;
// Adds a header X-Response-Time
app.use(responseTime(function (req, res, time) {
  if (bPerformanceLog) {
    if (req.method != 'OPTIONS') {
      console.log("Request: " + req.url + "(" + req.method + ")");
      console.log('Timetaken: ' + time);
    }
  }
  var stat = (req.method + req.url).toLowerCase()
    .replace(/[:\.]/g, '')
    .replace(/\//g, '_')
  stats.timing(stat, time)
}));


//*
// Compress response
//app.use(compression()) //compress all responses
app.use(compression(
  {
    filter: shouldCompress
  }))

function shouldCompress(req, res) {
  if (req.headers['ks-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
/** Used for testing only
app.get('/auth', function (req, res) {
  var sql = lookupSQL("sql.auth");
  if (bDebug)
    console.log(JSON.stringify(req.body));
  eSQL(pool, sql, req, function (m) {
    console.log("SQL Result: " + JSON.stringify(m));
    console.log("Result => " + m.get('result'));
    //TODO: Need to find a solution 
    module_holder['auth'](req, res, m);
    //			  console.log ( 'auth.js' ) ;
  });
});
//**/
app.post('/auth', function (req, res) {
  var sql = lookupSQL("sql.auth");
  if (bDebug)
    console.log(JSON.stringify(req.body));
  eSQL(pool, sql, req, function (m) {
    //TODO: Need to find a solution 
    module_holder['auth'](req, res, m);
  });
});

app.post('/noauth', function (req, res) {
  var sql = lookupSQL("sql.noauth");
  if (bDebug)
    console.log(JSON.stringify(req.body));
  eSQL(pool, sql, req, function (m) {
    //TODO: Need to find a solution 
    module_holder['auth'](req, res, m);
  });
});

app.post('/fbauth', function (req, res) {
  var sql = lookupSQL("sql.fbauth");
  if (bDebug)
    console.log(JSON.stringify(req.body));
  eSQL(pool, sql, req, function (m) {
    //TODO: Need to find a solution 
    module_holder['fbauth'](req, res, m);
  });
});

app.get('/resetpwd', function (req, res) {
  var password = generator.generate({
    length: 5,
    //    numbers: true,
    uppercase: false
  });
  var sql = lookupSQL("sql.resetPassword");
  var oParams = {};
  oParams.NEW_PASSWORD = password;
  eSQL(pool, sql, req, function (m) {
    var result = m.get('result')[0];
    console.log("Result => " + JSON.stringify(result));
    module_holder['gmailer'](req, res, m);
  }, oParams);
});

/*
app.post('/api/payment', function (req, res) {
  var sql = lookupSQL("sql.payment");
  if (bDebug)
    console.log(JSON.stringify(req.body));
  Adyen(req, res, function (m)
  //  executeSQL(sql, req, function(m)
  {
    console.log("SQL Result: " + JSON.stringify(m));
    console.log("Result => " + m.get('result'));
    //TODO: Need to find a solution 
    module_holder['auth'](req, res, m);
    //	  console.log ( 'auth.js' ) ;
  });
});
*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method == 'OPTIONS') {
    if (bDebug)
      console.log("OPTIONS " + req.url);
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Origin, ks-x-authorization, Authorization, enctype");
    res.sendStatus(200);
  }
  else
    next();
});

app.get('/google/connect', function (req, res) {
  //https://developers.google.com/identity/protocols/OAuth2UserAgent
  var sURL = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=token';
  sURL += '&client_id=' + CONFIG.google.client_id;
  sURL += '&redirect_uri=' + CONFIG.google.redirect_uri;
  sURL += '&scope=email profile';
  sURL += '&state=login';
  sURL += '&prompt=select_account';
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(sURL);
  res.redirect(sURL);
});

app.get('/google/connected', function (req, res) {
  console.log(JSON.stringify(req.query));
  var oToken = req.query.token;
  console.log("Authorization Token: " + oToken);
  const formData = { "access_token": oToken };
  request({
    url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + oToken,
    method: 'GET',
    //         auth: {
    //            user: CITI_CLIENT_ID,
    //            pass: CITI_CLIENT_SECRET
    //          },
    headers: {
      "content-type": "application/x-www-form-urlencoded",  // <--Very important!!!
    },
    form: formData
  }, function (err, data) {
    if (err) {
      console.log("Error: " + err);
      res.send(err);
    }
    else {
      var json = JSON.parse(data.body);
      if (json.audience === CONFIG.google.client_id) {
        console.log(json);
        res.send(json);
      }
      else {
        json.error = 'confulsed deputy issue';
        res.send(json);
      }
    }
    res.end('done');
  });
});

reloadProperties(true);

if (bDev) {
  /* Only during Development */
  FS.watchFile('SQLdef.properties', function (curr, prev) {
    //console.log('Reloading SQLdef.properties');
    reloadProperties(false);
  });
}
app.get('/api/:lid/time', function (req, res) {
  var t = new Date().toISOString();
  res.send({ date: t });
});

app.get('/api/:lid/aboutus', function (req, res) {
  var file = '/Images/aboutus.html';
  // res.sendFile (path.join(__dirname+'/about.html')) ;
  res.sendFile(file);
});

app.get('/download/uat', function (req, res) {
  var file = '/Images/uat/hie.apk';
  res.download(file);
});

app.get('/download/prd', function (req, res) {
  var file = '/Images/prd/hie.apk';
  res.download(file);
});


var module_holder = {};
function LoadModules(path) {

  FS.lstat(path, function (err, stat) {
    if (stat.isDirectory()) {
      // we have a directory: do a tree walk
      FS.readdir(path, function (err, files) {
        var f, l = files.length;
        for (var i = 0; i < l; i++) {
          f = PATH.join(path, files[i]);
          LoadModules(f);
        }
      });
    } else {
      // we have a file: load it
      if (path.endsWith(".js")) {
        if (bDebug)
          console.log("Load API: " + path);
        require(path)(module_holder);
      }
    }
  });
}
//var DIR = PATH.join(__dirname, 'lib', 'api');
var DIR = PATH.join(BASE_DIR, 'api');
LoadModules(DIR);

//image_handler.handler ( app ) ;

exports.module_holder = module_holder;

var image_handler = require(BASE_DIR + "/image_handler.js")(app);
// var stripe_payment = require(BASE_DIR + "/stripe_payment.js")(app, pool);
var adyen_payment = require(BASE_DIR + "/adyen_payment.js")(app, pool);
var adyen_payment_test = require(BASE_DIR + "/adyen_payment.test.js")(app, pool);

app.listen(CONFIG.port, function (o) {
  console.log("Port:" + CONFIG.port);
  //console.log ( JSON.stringify ( exports.module_holder )) ;
});
