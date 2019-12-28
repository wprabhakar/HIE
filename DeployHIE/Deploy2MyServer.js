var plan = require('flightplan');
var appName = 'HIE';
var UATusername = 'tpc-web';
var startFile = 'index.js';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('DEV', [
  {
    host: 'www.totoplayers.club',
    username: UATusername,
//    password: 'tpc-webNoPassword12',
  //  privateKey: '~/.ssh/id_rsa',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

//add in another server if you have more than one
// {
//   host: '104.131.93.216',
//   username: username,
//   agent: process.env.SSH_AUTH_SOCK
// }
]);

// run commands on localhost
plan.local(function(local) {
  local.log('Copy files to remote hosts');
  local.exec('mkdir ~/tmp/' + tmpDir );
  local.exec('cp pullFromGit.sh ~/tmp/' + tmpDir);
  local.exec('cd ~/tmp/' + tmpDir + ' && ./pullFromGit.sh ' + appName );
  // rsync files to all the destination's hosts
 // local.with('cd ~/tmp/' + tmpDir + '/HIE/HIEBackend', function() {
 ////   var filesToCopy = local.exec('git ls-files', {silent: true});
 //   local.transfer(filesToCopy, '/tmp/' + tmpDir + '/HIE/HIEBackend');
 // });
  local.with('cd ~/tmp/' + tmpDir + '/' + appName, function() {
    var filesToCopy = local.exec('git ls-files | grep HIEBackend', {silent: true});
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
  });
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: UATusername});
  remote.rm('-rf /tmp/' + tmpDir);
  
  //remote.log('Install dependencies');
  //remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: UATusername});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: UATusername});
  remote.sudo('cd ~/'+appName + '/HIEBackend && ../../NodeServer/setup.sh', {user: UATusername});
 // remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
 // remote.exec('forever start ~/'+appName+'/'+startFile);
//  remote.sudo('stop HIEBackend') ;
//  remote.sudo('start HIEBackend') ;
});
