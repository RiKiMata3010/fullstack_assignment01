const express = require('express');
const User = require('../schema/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const newUser = new User(req.body);
  if (!req.body['username'] || !req.body['password'] || !req.body['email']) {
    res.status(400).json({
      status: false,
      message: "Invalid Username and password"
    });
  } else {
    await newUser.save();
    res.status(201).json({
      message: 'user created'
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user == null) {
    return res.status(400).json(false);
  } else {
    req.session.isAuth = true;
    req.session.user = user;
    return res.status(200).json(true);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log("logout failed...");
    } else {
      console.log("user loggedout")
    }
  });
  res.redirect('/');
})

router.get('/', (req, res) => {
  res.json(req.session)
})
module.exports = router;