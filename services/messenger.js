const request = require("request");

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request(
    {
      url: "https://graph.facebook.com/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: { text: text },
      },
    },
    function (error, response) {
      if (error) {
        console.log("Error sending message: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}

module.exports = { sendMessage };
