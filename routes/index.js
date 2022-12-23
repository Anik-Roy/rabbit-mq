const express = require('express');
const router = express.Router();

const appRoutes = require('./app');

router.post('/publish-message', appRoutes.publishMessageToQueueMiddleware);

module.exports = router;