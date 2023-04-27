const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const tokens = require('../../token.json');
const {createLabel} = require("./createLabel")
const {modifyLabel} = require("./modifyLabel")


let getLabels = async function (id) {
    let labelId = "";
    
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(tokens);
    var Gmail =  google.gmail({ version: 'v1', auth: oAuth2Client });

    const { id: newLabelId } =  Gmail.users.labels.list({
      userId: "prayag.jain.120@gmail.com"
        }).then(async (data) => {
            let data1 =  data.data.labels
            
            for(let i=0;i<data1.length;i++){
                if(data1[i].name=="alreadyReplied"){
                    labelId = data1[i].id
                }
            }
            if(!labelId){
                labelId = await createLabel()
            }
            console.log("from get label",typeof labelId)
            modifyLabel(labelId,id)
            return labelId
        })
      .catch(err => console.log(err))
}

module.exports = { getLabels }