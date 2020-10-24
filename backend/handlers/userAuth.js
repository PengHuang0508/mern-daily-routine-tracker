const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.json({
        error: err,
      });
    }

    let newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      sex: req.body.sex,
      age: req.body.age,
    });

    newUser
      .save()
      .then(() => res.json('New user added.'))
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(400).json('The username already exists.');
        }

        return res.status(400).json('Error: ' + err);
      });
  });
};

exports.signIn = (req, res, next) => {
  let credential = {
    username: req.body.username,
    password: req.body.password,
  };

  User.findOne({ username: credential.username })
    .then((user) => {
      if (user) {
        bcrypt.compare(credential.password, user.password, function (
          err,
          result
        ) {
          if (err) {
            res.status(400).json({ error: err });
          }

          if (result) {
            res.json({ message: 'Signed in.', userInformation: user });
          } else {
            res.status(400).json({
              message: 'Wrong password.',
            });
          }
        });
      } else {
        res.status(400).json({ message: 'User not found.' });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};
