const jwt = require('jsonwebtoken');
const config = require('config');

const helperFunction = require('../helpers/helperFunction');

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.phone = user.phone;
};

User.register = (newUser, result) => {
  const query = `INSERT INTO user(acc, pass, phoneNum, Name) VALUES(?, ?, ?, ?);`;
  pool.query(query, [newUser.username, newUser.password, newUser.phone, 'Idol Dat'],
                                  (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err.statusCode,
          err.message,
          null
        ),
        null
      );
      return;
    }

    const payload = {
      user: {
        id: newUser.username,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: 3600},
      (err, token) => {
        if (err) {
          console.log('error: ', err);
          result(
            helperFunction.responseHandler(
              false,
              err.statusCode,
              err.message,
              null
            ),
            null
          );
          return;
        }
        result(
          null,
          helperFunction.responseHandler(true, 200, 'User registered', {token})
        );
      }
    );
  });
};

User.login = (newUser, result) => {
  const query = `SELECT * FROM user WHERE acc = ?;`;

  pool.query(query, newUser.username, async (err, results) => {
    if (err || !results[0]) {
      console.log('error: ', err);
      const code = !results[0] ? 404 : err.statusCode;
      result(
        helperFunction.responseHandler(
          false,
          code,
          !results[0] ? 'User does not exists' : err.message,
          null
        ),
        null
      );
      return;
    }

    const user = results[0];

    if (newUser.password != user.pass) {
      result(
        helperFunction.responseHandler(false, 400, 'Incorrect password', null),
        null
      );
    }

    const payload = {
      user: {
        id: newUser.username,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: 3600},
      (err, token) => {
        if (err) {
          console.log('error: ', err);
          result(
            helperFunction.responseHandler(
              false,
              err.statusCode,
              err.message,
              null
            ),
            null
          );
          return;
        }
        result(
          null,
          helperFunction.responseHandler(true, 200, 'User logged in', {token})
        );
      }
    );
  });
};

module.exports = User;
