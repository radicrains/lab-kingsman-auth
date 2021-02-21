const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const roomController = require('./controllers/room.js');
const session = require('express-session');
const User = require('./models/users.js');

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// Database
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});


app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/room', roomController);

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT));
