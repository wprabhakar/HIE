'use strict' ;
var FS = require('fs');

/*
Authorization Code: ac_9l208Ac0fRnGFnN9LEdGBeJVSh30DMc2
{ access_token: 'sk_test_R8BCTDEx1BaLnjdbJhPR5FF8',
  livemode: false,
  refresh_token: 'rt_9l203mKbjnLi8st3aQIbFaSlrM2ijBC6nKrwHVEAbLDfCKmW',
  token_type: 'bearer',
  stripe_publishable_key: 'pk_test_4A1j4WBkbA6oEM26Q94cFpmP',
  stripe_user_id: 'acct_19QW1uH6OheHrAbE',
  scope: 'read_write' }
*/
var sFBPassword = FS.readFileSync('/Credentials/fb.txt'); // get 
module.exports = exports = {
  stripePublishableKey: 'pk_test_4A1j4WBkbA6oEM26Q94cFpmP',
  stripeSecretKey: 'sk_test_aab3N06Ts2vXg2O3cEkJaAPz', /*kris.projects.dev@gmail.com */
  stripeClientId: 'ca_9kKuYFlbBz2iCutLnLFAsRkscSN90aGw', /* kris.projects.dev */
  stripeRedirectUri: 'https://localhost:4200/stripe/connected',
  port: 4200,

  adyen: {
    UAT: {
    URL: 'https://pal-test.adyen.com/pal/servlet/Payment/v25/authorise',
    merchantAccount: 'HIEarlySG',
    username: 'ws@Company.HIEarly',
    password: 'nLq97PC&y/+%Bz9-pRiMq%xx?',
    clientKey: '10001|ABC705664E65E4BC2D563D347C056BA06542F1290025A1F0B4FF3A0D5FFA946F12DAAE7AD8BDF6A93D82839D3108BF5A350882BA9A72021D06E809E29F358A80CB07BA859270F16DD068AE7047661F588E163B2C8AAC2074815766BACE074FAD4E6771E78EDEFBFBB6E53591BC99BC5AB5EB4A763F8F56CFA0C0E0F9569C748E89FEFC51ED1FF3EA2D9B708B18159556EDD71AA4C22ECEEB5340B82ED7305CEF0EFF9EB06A909612A33EFDF4E1A5F05B5CAB6A0A6D18F5BD58D551D6456DBA00B517F242E870D6123D2507B7BAF46277884814384C91868EB36599E623BE9B2E044ECCBC272E3335A1CB10D39684DF66BDEF4BF7851FAD027E95C69826F723F3'
    },
    PROD: {
      URL: '****** ADYEN URL NOT DEFINED in config/index.js **********',
      merchantAccount: 'HIEarlySG',
      username: 'ws@Company.HIEarly',
      password: 'nLq97PC&y/+%Bz9-pRiMq%xx?',
      clientKey: '10001|ABC705664E65E4BC2D563D347C056BA06542F1290025A1F0B4FF3A0D5FFA946F12DAAE7AD8BDF6A93D82839D3108BF5A350882BA9A72021D06E809E29F358A80CB07BA859270F16DD068AE7047661F588E163B2C8AAC2074815766BACE074FAD4E6771E78EDEFBFBB6E53591BC99BC5AB5EB4A763F8F56CFA0C0E0F9569C748E89FEFC51ED1FF3EA2D9B708B18159556EDD71AA4C22ECEEB5340B82ED7305CEF0EFF9EB06A909612A33EFDF4E1A5F05B5CAB6A0A6D18F5BD58D551D6456DBA00B517F242E870D6123D2507B7BAF46277884814384C91868EB36599E623BE9B2E044ECCBC272E3335A1CB10D39684DF66BDEF4BF7851FAD027E95C69826F723F3'        
    }
  },

  stripe: {
    	 sURL: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id='
//	 sURL: 'https://connect.stripe.com/oauth/authorize?response_type=scope=read_write&code&client_id='  /*+ CONFIG.stripeClientId + '&email=abcd@gmail.com' 
//*/
  },
  
  poolsize: 5,
  options: {
    host: '127.0.0.1',
    port: 3050,
    database: 'HIE-N',
    user: 'SYSDBA',
    password: 'masterkey',
    role: null, // default
    pageSize: 4096 // default when creating database
  },

  google: {
    client_id: '324005653734-0a3bjk6hldakj3f1pq1iacdi2akua6pm.apps.googleusercontent.com',
    secret: 'NgDTmPpOjOjrKPigfH-HihFi',
    redirect_uri: 'http://localhost:4200/google/connected'
  }
} ;
