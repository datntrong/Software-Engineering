const {validationResult} = require('express-validator');

const helperFunction = require('../helpers/helperFunction');
const User = require('../models/users.models');

const login = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        helperFunction.responseHandler(false, 400, errors.array()[0].msg, null)
      );
  }
  try {
    // Login the user
    User.login(new User(req.body), (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

module.exports = authController = {
  login,
};
