// Insert a user into the database
const router = require('express').Router();
const User = require('../../models/User');  // User is our collection

// GET All users

// GET /api/user/

// Route to sign them up
router.post('/signup', (req, res, next) => {
  // Grab all the information from the s  ignup form
  const email = req.body.email;
  const password = req.body.password;

  User.find({
    email: req.body.email
  })
    .then(user => {
      if (user.length > 0) {
        res.json('Email already exists!');
      }
    })

  User.create({
    email: email,
    password: password,

  })
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => console.log(err));

})

// Route to login them in
router.post('/login', (req, res, next) => {
  // Grab all the information from the signup form
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email,
  })
    .populate('items')
    .then(user => {
      if (!user) {
        res.json('User not found!')
      } else if (user.comparePassword(password) === false) {
        res.json('Wrong password.');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }

    })

})

router.post('/user', (req, res, next) => {
  // Grab all the information from the signup form
  const email = req.body.email;
  const points = req.body.points;

  User.findOne({
    email: email,
  })
    .populate('items')
    .then(user => {
      if (!user) {
        res.json('User not found!')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }

    })

})

// Get user stored in session
router.get('/whoami', (req, res) => {
  if (!req.user) {
    res.json({})
  }
  res.json(req.user)

})

router.get('/logout', (req, res) => {
  req.logout();
  res.json('Successfully Logged Out')
});


module.exports = router;