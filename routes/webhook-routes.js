const { sendMessage } = require("../services/messenger");
const { verifyWebhook } = require("../middlewares/verify-webhook");

function setupWebhookRoutes(app) {
  // Ruta para la validación del webhook
  app.get("/webhook", verifyWebhook, (req, res) => {
    res.status(200).send(req.query["hub.challenge"]);
  });

  // Ruta para manejar los eventos de mensajes
  app.post("/webhook", (req, res) => {
    if (req.body.object === "page") {
      req.body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          if (event.message && event.message.text) {
            sendMessage(event);
          }
        });
      });
      res.status(200).end();
    }
  });
}

module.exports = { setupWebhookRoutes };
