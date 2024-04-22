require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { setupWebhookRoutes } = require("./routes/webhook-routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

// Configuración de las rutas del webhook
setupWebhookRoutes(app);
