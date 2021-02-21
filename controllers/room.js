const express = require('express');
const room = express.Router();
const User = require('../models/users.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new');
    }
};

room.get('/', isAuthenticated, (req,res) => {
    User.find({}, (err, allUsers)=> {
        res.render('room/index.ejs', {
        users: allUsers
        });
    });
});
  
room.post('/new', (req,res) => {
    User.findOneAndUpdate({_id: req.session.currentUser._id},{$push: {messages:req.body.message}}, (err, allUsers) => {
        res.redirect('/room');
    });
});

room.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/');
    });
  });

module.exports = room;
