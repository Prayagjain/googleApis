const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const tokens = require('../../token.json');



let createLabel = async function () {
  let res = ""
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(tokens);
    var Gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const { id: newLabelId } =  Gmail.users.labels.create({
      userId: "prayag.jain.120@gmail.com",
    resource: {
      name: "alreadyReplied",
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show'
    }
        }).then(data => {
          res = data.data.id
          return res
        })
        .catch((err) => {
          console.log(err)
          res.send({err:err})
        })
      
}
module.exports = { createLabel }