var axios = require("axios");
var qs = require("qs");
const {getToken, searchUnreadGmail,gmailContent} = require("./support")
const {main}= require("../controller2/src"); 
const { getLabels } = require("../controller2/getLabels");

let interval;

const startServer = async function (req, res) {
  //  interval = setInterval(async ()=>{
    const accessToken = await getToken();
    const id = await searchUnreadGmail(accessToken);
    let getLabelId = await getLabels(id);
    console.log("labels",getLabelId)
    const message = await gmailContent(accessToken,id);

    let from;
    if(!message.labelIds.includes(getLabelId)){
        let metaData = message.payload.headers
        for(let i=0;i<metaData.length;i++){
            if(metaData[i].name=="From"){
               from = metaData[i].value
               break;
            }
        } 
    }

       let sendMail = await main(from)
       
       
  //  },7000)
}

const stopServer = ()=>{
    clearInterval(interval)
    res.send({message:"server stoped"})
}


module.exports = { startServer,stopServer };
