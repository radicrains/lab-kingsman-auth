const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');


users.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    }
    console.log(createdUser);
    res.redirect('/')
  });
});

module.exports = users;