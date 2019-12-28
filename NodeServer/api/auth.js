var jwt = require('../node_modules/jsonwebtoken');

var bDebug = false ;
function handler ( req, res, m )
{
	  console.log ( 'auth.js' ) ;
	   res.setHeader ("Access-Control-Allow-Origin", "*") ;
	    if (m.get('result'))
	    {
	      if (bDebug)
	        console.log("Result Found: " + m.get('result').length);
	      if (m.get('result').length == 0)
	      {
	        res.status(401);
	        res.send("Authentication Failed.");
	        return;
	      }
//	      console.log ( "Authenticated: " + JSON.stringify ( m ) ) ;
	      /*
	            // async sign
	            jwt.sign( m.toObject(), cert, { algorithm: 'RS256' }, function(err, token) {
	               console.log(token);
	               res.json({
	                success: true,
	                message: 'Authenticated!',
	                token: token,
	                result: m.toObject()
	              });
	             });
	      */
	      // async sign
	      var v = m.get('result') ;
//	      v.exp = Math.floor(Date.now() / 1000) + (60 * 60) ;
	      console.log ( JSON.stringify ( v[0] ) ) ;
	      //https://github.com/auth0/node-jsonwebtoken
	      jwt.sign({data: v[0] } , 'mysecret', { }, function(err, token)
	      {
	        console.log(token);
	        res.json(
	        {
	          success: true,
	          message: 'Authenticated!',
	          id_token: token,
//	          result: v.toObject()
	        });
	      });
	    }
	    else
	    {
	      console.log("Server Error: " + JSON.toString(m.toObject()));
	      res.status(500);
	      //      res.end ( ) ;
	      res.json(
	        {
	          error: "Server Error"
	        })
	        //      res.send ( "Server Error" ) ;
	      return;
	    }
//	        res.json(
//	        {
//	          success: true,
//	          message: 'TODL auth.js!',
//	        });
}

module.exports = function ( module_holder ) {
  module_holder [ 'auth' ] = handler ;
}
