const express = require('express');
const account = require('./Account/account')
const router = express.Router();

router.use('/account', account);

module.exports = router


