const express = require('express');

// const auth = require('../middleware/auth');
const tripsController = require('../controllers/trips');

const router = express.Router();

/** @route      POST /trips
 *  @desc       fetch all trips satisfy the conditions
 *  @access     Private
 */
router.post('/', tripsController.getTrips);

module.exports = router;
