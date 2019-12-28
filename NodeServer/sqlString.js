var url = require('url');

var bDebug = false;
module.exports = function (str, req, oParams = null) {
  if (oParams !== null) {
    console.log("Params: " + JSON.stringify(oParams));
    Object.keys(oParams).forEach(function (key) {
      if (bDebug)
        console.log("Additional Param: " + key + ":" + oParams[key])
      str = replaceAll(str, "@" + key + "@", oParams[key]);
    });
  }
  if (req.session_data) {
    var obj = req.session_data;
    Object.keys(obj).forEach(function (key) {
      str = replaceAll(str, "@" + key + "@", obj[key]);
    });
  }
  var obj = req.params; // Access URL Path Parameters
  Object.keys(obj).forEach(function (key) {
    if (bDebug)
      console.log("Recd URL Params: " + key + ":" + obj[key]);
    str = replaceAll(str, "@:" + key + "@", obj[key]);
  });

  obj = url.parse(req.url, true).query; // Access QUERY Parameters
  Object.keys(obj).forEach(function (key) {
    if (bDebug)
      console.log("Recd Query Params: " + key + ":" + obj[key]);
    str = replaceAll(str, "@" + key + "@", obj[key]);
  });
  obj = req.body; // Access POST Parameters
  if (bDebug)
    console.log("Recd Body: " + JSON.stringify(obj));
  Object.keys(obj).forEach(function (key) { 
    var s = obj[key] ; //replaceAll(obj[key], "'", "''" ) ;
    str = replaceAll(str, "@" + key + "@", s);
  });
  return str;
}
