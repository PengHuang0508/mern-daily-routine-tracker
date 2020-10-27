const router = require('express').Router();
let User = require('../models/user.model');

router.route('/all').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route('/register').post((req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: 'Username cannot be empty.' });
  }

  let newUser = new User({
    username: req.body.username.toLowerCase(),
  });

  newUser
    .save()
    .then((userInformation) => res.json(userInformation))
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'The username already exists.' });
      }

      return res.status(400).json({ error });
    });
});

router.route('/signIn').post((req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: 'Username cannot be empty.' });
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.json(user);
      }

      return res.status(400).json({ error: 'User not found.' });
    })
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
