function verifyWebhook(req, res, next) {
  if (
    req.query["hub.mode"] &&
    req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
  ) {
    next();
  } else {
    res.status(403).end();
  }
}

module.exports = { verifyWebhook };
