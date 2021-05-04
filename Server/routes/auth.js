const express = require('express');
const {check} = require('express-validator');
const path = require('path');
const auth = require('../middleware/auth');
const authController = require('../controllers/auth');
const router = express.Router();

/** @route      POST /auth
 *  @desc       log in user
 *  @access     Private
 */
router.get("/login",(req,res)=>{
  res.sendFile(path.join(__dirname + '/dangnhap.html'));
})
router.post(
  '/',
  // [
  //   check('username', 'Please include a valid username').isLength({min: 3}),
  //   check('password', 'Password is required').not().isEmpty(),
  // ],
  authController.login
);

module.exports = router;
