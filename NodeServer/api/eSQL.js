var jwt = require('../node_modules/jsonwebtoken');
var Firebird = require('../node_modules/node-firebird');
var Map = require("../node_modules/collections/map");
var FastMap = require("../node_modules/collections/fast-map");
var _check = require('../node_modules/check-types');

var bDebug = true ;

function handler ( pool, sql, req, func )
{
  sql = sqlString(sql, req);
  var oRMap = new Map();
  pool.get(function(errConnect, db)
  {
    if (errConnect)
    {
      console.log(JSON.stringify(errConnect));
      oRMap.set("No free connections");
      oRMap.set("_error", errConnect);
      func(oRMap);
      return;
    }
    db.query(sql, function(err, result)
    {
      //*
            if ( err )
            {
              oRMap.set("_error", err);
              console.log ( sql ) ;
              console.log ( JSON.stringify ( err ) ) ;
              if ( bDebug === true )
              {
                oRMap.set ( "sql", sql ) ;
              }
              func ( oRMap ) ;
              return ;
            }
      //*/
      if (bDebug)
      {
        oRMap.set("sql", sql);
//        console.log(sql);
//        console.log(result);
      }      
      var oResult = [];
      if ( result !== 'undefined' )
      {
    	    if ( !Array.isArray(result) )
    	    	{
    	    	  var convert2Array = [] ;
    	    	  convert2Array.push ( result ) ;
    	    	  result = convert2Array ;
    	    	}
        result.forEach(function(row)
        {
          var oRow = {};
          for (var attributename in row)
          {
            var obj = row[attributename] ;
            if ( _check.null ( obj ) )
              oRow[attributename] = null ;
            else
            if ( _check.date ( obj ) )
              oRow[attributename] = _moment(obj);
            else
            if ( _check.number ( obj ) )
              oRow[attributename] = obj.toString(10);
            else
              oRow[attributename] = obj.toString('utf8');
          }
          oResult.push(oRow);
          if (bDebug)
            console.log(JSON.stringify(oRow));
        });
      }
      db.detach();
      oRMap.set("result", oResult);
      func(oRMap);
      return;
    });
  });
}

module.exports = function ( module_holder ) {
  module_holder [ 'eSQL' ] = handler ;
}
