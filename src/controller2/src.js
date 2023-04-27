const {sendMail} = require('./gmail.js');

const main = async (from) => {

  const options = {
    to: `${from}`,
    //cc: 'cc1@example.com, cc2@example.com',
    replyTo: `${from}`,
    subject: 'Hello🚀',
    text: 'Thank you for your mail I am bot which replyig on behalf of the account owner',
    html: `<p>🙋🏻‍♀️ Thank you for your mail I am bot which replyig on behalf of the account owner </p>`,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'prayag jain' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };

  await sendMail(options);
  
};
module.exports = {main}