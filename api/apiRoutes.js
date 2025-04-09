const express = require('express');
const account = require('./Account/account')
const inventory = require('./Inventory/inventory')
const router = express.Router();

router.use('/account', account);
router.use('/inventory', inventory)

module.exports = router


