var axios = require("axios");
var qs = require("qs");


const getToken = async function () {
    let accessToken = "";
    let data = qs.stringify({
        client_id:
            "",
        client_secret: "",
        refresh_token:
            "",
        grant_type: "refresh_token",
    });

    let config = {
        method: "post",
        url: "https://accounts.google.com/o/oauth2/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
    };

    await axios(config)
        .then(async (response) => {
            accessToken = await response.data.access_token;

            console.log("Access Token " + accessToken);
        })
        .catch(function (error) {
            console.log(error);
        });
    return accessToken
};


let searchUnreadGmail = async (accessToken,searchItem="from:prayag.jain.120@gmail.com") => {
    let config1 = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is%3Aunread&access_token=" + searchItem,
      headers: {
        Authorization: `Bearer ${await accessToken} `,
      },
    };

    let id = "";
    await axios(config1)
      .then(async function (response) {
        id = await response.data["messages"][0].id;    
      })
      .catch(function (error) {
        console.log(error);
      });

    return id;
  };


  let gmailContent = async (accessToken,messageId) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await accessToken}`,
      },
    };

    let data = {};

    await axios(config)
      .then(async function (response) {
        data = await response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

module.exports = { getToken,searchUnreadGmail,gmailContent }
