//http://stackoverflow.com/questions/34546142/gmail-api-for-sending-mails-in-node-js

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
}

function sendMessage(auth) {
    var raw = makeBody('myrealemail@gmail.com', 'myrealemail@gmail.com', 'test subject', 'test message');
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    }, function(err, response) {
        res.send(err || response)
    });
}

fs.readFile(secretlocation, function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    authorize(JSON.parse(content), sendMessage);
});

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
