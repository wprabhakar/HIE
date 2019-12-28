//var jwt = require('/node_modules/jsonwebtoken');
var Firebird = require('./node_modules/node-firebird');
var Map = require("./node_modules/collections/map");
var FastMap = require("./node_modules/collections/fast-map");
var _check = require('./node_modules/check-types');
var _moment = require('moment');

var sqlString = require('./sqlString');

var bDebug = true;

module.exports = function (pool, sql, req, func, oParams = null) {
  sql = sqlString(sql, req, oParams);
  if (bDebug == true)
    console.log("**SQL> " + sql);
  var oRMap = new Map();
  // if ( oParams !== undefined && oParams != null )
  // {
  //   Object.keys(oParams).forEach(function(key) {
  //     oRMap.set(key, o[key])
  //     console.log ( JSON.stringify ( oRMap )) ;
  //   });
  // }
  pool.get(function (errConnect, db) {
    if (errConnect) {
      console.log(JSON.stringify(errConnect));
      oRMap.set("FATAL: No DB free connections");
      oRMap.set("_error", errConnect);
      func(oRMap);
      return;
    }
    db.query(sql, function (err, result) {
      if (bDebug === true) {
        oRMap.set("sql", sql);
      }
      
      //*
      if (err !== undefined) {
        db.detach();
        oRMap.set("_error", err);
        console.log(err.message);        
        //        console.log(sql);
//        console.log(err);
        func(oRMap);
        return;
      }
      // if ( result.length == 0 )
      //   {
      //       db.detach();
      // oRMap.set("result", new Array());
      // console.log ( "*****>>>> " + result ) ;
      // func(oRMap,oParams);
      // return;
      //   }

      //*/
      var oResult = [];
      if (result !== 'undefined') {
        if (!Array.isArray(result)) {
          var convert2Array = [];
          convert2Array.push(result);
          result = convert2Array;
        }
        if (bDebug == true && result.length == 0) {
          console.log(sql);
          console.log("No Rows Returned");
        }
        result.forEach(function (row) {
          var oRow = {};
          for (var attributename in row) {
            var obj = row[attributename];
            // if (attributename === 'CUISINES') 
            // {
            //   row[attributename] = "" ;
            //   obj(function (err, name, e) {
            //     if (err)
            //       throw err;                
            //     e.on('data', function (chunk) {
            //       row[attributename] += data ;
            //     });
            //     e.on('end', function () {
            //       console.log ( row[attributename]) ;
            //     });
            //   });
            // }
            if (_check.null(obj))
              oRow[attributename] = null;
            else
              if (_check.date(obj))
                oRow[attributename] = _moment(obj);
              else
                if (_check.number(obj))
                  oRow[attributename] = obj.toString(10);
                else {
                  if (getObjectType(obj) === 'Undefined') {
                    console.log("ObjectType: [" + attributename + "]" + getObjectType(obj));
                    oRow[attributename] = "";
                  }
                  else
                    if (Array.isArray(obj)) {
                      console.log("ARRAY: " + oRow[attributename]);
                      var convert2Array = [];
                      convert2Array.push(obj);
                      oRow[attributename] = "";
                      for (let z = 0; z < convert2Array.length; z++) {
                        if (z > 0)
                          oRow[attributename] += ',';
                        oRow[attributename] += convert2Array[z].toString('utf8');
                      }
                    }
                    else
                      oRow[attributename] = obj.toString('utf8');
                }
          }
          oResult.push(oRow);
          if (bDebug)
            console.log(JSON.stringify(oRow));
        });
      }
      db.detach();
      oRMap.set("result", oResult);
      func(oRMap,oParams);
      return;
    });
  });
}

getObjectType = function (obj) {
  console.log ( "getObjectType: " + Object.prototype.toString.call(obj).slice(8, -1) ) ;
  return Object.prototype.toString.call(obj).slice(8, -1);
}
/*
module.exports = function ( module_holder ) {
  module_holder [ 'eSQL' ] = handler ;
}
*/