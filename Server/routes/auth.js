const express = require('express');
const {check} = require('express-validator');

const auth = require('../middleware/auth');
const authController = require('../controllers/auth');

const router = express.Router();

/** @route      POST /auth
 *  @desc       log in user
 *  @access     Private
 */
router.post(
  '/',
  [
    check('username', 'Please include a valid username').isLength({min: 6}),
    check('password', 'Password is required').not().isEmpty(),
  ],
  authController.login
);

module.exports = router;
