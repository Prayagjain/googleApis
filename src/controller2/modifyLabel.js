const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const tokens = require('../../token.json');



let modifyLabel = async function (labelId,id) {

    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(tokens);
    var Gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    console.log("hello",labelId,id)
    Gmail.users.messages.modify({
        'userId': 'prayag.jain.120@gmail.com',
        'id': id,
        'addLabelIds': [labelId],
        'removeLabelIds': ["UNREAD"]
    }).then(data => console.log(data))
      .catch(err => console.log(err))
}
module.exports = {modifyLabel}