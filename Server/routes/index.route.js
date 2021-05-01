const express = require('express');

const auth = require('./auth');
const users = require('./users');
const trips = require('./trips');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/trips', trips);

module.exports = router;
