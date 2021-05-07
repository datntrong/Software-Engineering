const express = require('express');
const path = require('path');

const auth = require('./auth');
const users = require('./users');
const trips = require('./trips');

const router = express.Router();

router.get("/login",(req,res)=>{
  res.sendFile(path.join(__dirname + '/dangnhap.html'));
})
router.get("/sign",(req,res)=>{
  res.sendFile(path.join(__dirname + '/dangki.html'));
})
router.get("/check",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index1.html'));
})
router.use('/auth', auth);
router.use('/users', users);
router.use('/trips', trips);

module.exports = router;
