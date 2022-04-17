const express = require('express');
const router = express.Router();
const device_statusController = require('../controllers/Device_statusController');
const auth = require('../controllers/AuthenticateUser');

router.get('/', auth(['C']), device_statusController.show);

module.exports = router;