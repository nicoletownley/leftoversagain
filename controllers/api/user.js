// Insert a user into the database
const router = require('express').Router();
const User = require('../../models/User');  // User is our collection

// GET All users

// GET /api/user/



router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      console.log(user);
      res.json(user);
    })
    .catch(err => console.log(err))
})

// Route to sign them up
router.post('/signup', (req, res) => {
  // Grab all the information from the signup form
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  User.create({
    email: email,
    password: password,
    
  })
  .then(user => {
    res.json(user);
  })

})

// Route to login them in
router.post('/login', (req, res) => {
  // Grab all the information from the signup form
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email,
    password: password,
  })
  .then(user => {
    console.log(user);
    if(!user) {
      res.json('User not found!')
    }
    res.json(user);
  })

})


module.exports = router;