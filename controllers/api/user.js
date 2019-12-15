// Insert a user into the database
const router = require('express').Router();
const User = require('../../models/User');  // User is our collection

// GET All users

// GET /api/user/



// router.get('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       console.log(user);
//       res.json(user);
//     })
//     .catch(err => console.log(err))
// })

// Route to sign them up
router.post('/signup', (req, res, next) => {
  // Grab all the information from the s  ignup form
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

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
  .then(user => {
    console.log(user);
    if(!user) {
      res.json('User not found!')
    } else if (user.comparePassword(password) === false ) {
      res.json('Wrong password.');
    } else {
      console.log('here');
      req.login(user, err => (err ? next(err) : res.json(user)));
    }

  })

})

router.get('/whoami',(req, res) => {
  // Does the user have a session stored with us?
  console.log('whoami', req.user);
  if (!req.user) {
    res.json({})
  }
  res.json(req.user)
  
})

router.get('/logout',(req, res) => {
  // Does the user have a session stored with us?
 req.logout ();
res.json ('Successfully Logged Out')
});


module.exports = router;