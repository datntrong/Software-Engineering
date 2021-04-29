const express = require('express');
const {check} = require('express-validator');

const checkExistence = require('../middleware/checkExistence');
const usersController = require('../controllers/users');

const router = express.Router();

/** @route      POST /users/:id
 *  @desc       register a new user
 *  @access     Private
 */
router.post(
  '/',
  [
    check('username', 'Please include a valid username').isLength({min: 6}),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({min: 6}),
    checkExistence,
  ],
  usersController.register
);

module.exports = router;
