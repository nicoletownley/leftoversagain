const router = require('express').Router();
const Item = require('../../models/Item.js');
const User = require('../../models/User.js');

// GET All items

router.get('/', (req, res) => {
  Item.find({})
    .then(items => {

      res.json(items)
    })
})


// might use in next feature of app

router.get('/item/:id', (req, res) => {
  Item.find({ _id: req.params.id })
    .then(item => {

      res.json(item);
    })
})

// Grab all the information from the add perfume form
router.post('/', (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const points = req.body.points;
  const description = req.body.description;
  const oz = req.body.oz;


  Item.create({
    name,
    email,
    points,
    description,
    oz,
  })
    .then(item => {

      //after we add perfume make sure we add the perfume's id to the user's list of perfumes
      User.update(
        { _id: req.user._id },
        { $push: { items: item._id } },
        (error, success) => {
          res.json(item);
        }
      )
    })

})

//allows only the user who added their perfume to delete it
router.delete('/delete/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(item => {
      res.json('Item successfully deleted');
    })
})

/*
1.Update their points
2.Delete those items
3.Add points to the owner's account
*/
router.post('/checkout', (req, res) => {


  // Remove those points from user

  User.update(
    { _id: req.user._id },
    { "$inc": { "points": -parseInt(req.body.sum) } }
  )
    //look for the email of the user and upload their points needs to work with "each" do to asynchronicity
    .then(user => {
      req.body.cart.forEach(perfume => {
        User.update(
          { email: perfume.email },
          { "$inc": { "points": parseInt(req.body.sum) } }
        )
          .then(user => {
            //needs response from server after done updating mongoDB
          })

      })

      req.body.cart.forEach(perfume => {
        Item.deleteOne({ _id: perfume._id })
          .then(item => {
            res.json('Successfully deleted');
          })
      })
    })



})





module.exports = router;