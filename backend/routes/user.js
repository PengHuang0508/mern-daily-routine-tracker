const router = require('express').Router();
let User = require('../models/user.model');

//TODO: delete later
router.route('/all').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  if (!req.body.username) {
    return res.status(400).json('Username cannot be empty.');
  }

  let newUser = new User({
    username: req.body.username.toLowerCase(),
  });

  newUser
    .save()
    .then((userInformation) => res.json(userInformation))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json('The username already exists.');
      }

      return res.status(400).json('Error: ' + err);
    });
});

router.route('/signIn').post((req, res) => {
  if (!req.body.username) {
    return res.status(400).json('Username cannot be empty.');
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.json(user);
      }

      return res.status(400).json('User not found.');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
