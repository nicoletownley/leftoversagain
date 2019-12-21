const router = require('express').Router();
const Item = require('../../models/Item.js');  
const User = require('../../models/User.js');  
const db  = 
// GET All items

router.get('/', (req, res) => {
  Item.find({})
    .then(items => {

      res.json(items)
    })
})


// User hits /item

router.get('/item/:id', (req, res) => {
  Item.find({ _id: req.params.id })
    .then(item => {

      res.json(item);
    })
})
router.post('/', (req, res) => {
  // Grab all the information from the signup form
  const name = req.body.name;
  const email = req.body.email;
  const points= req.body.points;
  const description= req.body.description;
  const oz=req.body.oz;
  

  Item.create({
    name,
    email,
    points,
    description,
    oz,
  })
    .then(item => {
   

      User.update(
        { _id: req.user._id },
        { $push: { items: item._id} },
        (error, success) => {
          res.json(item);
        }
      )



    })

  })

  router.delete('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(item => {
        res.json('Item successfully deleted');
      })
  })

  router.post('/checkout', (req, res) => {
    
    console.log(req.body.sum)
    console.log(req.body.cart)
    // Remove those points from user
   
    User.update(
      {_id: req.user._id},
      {"$inc": {"points": -parseInt(req.body.sum)}}
    )
    //look for the email of the user and upload their points needs to work with "each" do to asynchronicity
    .then(user => {
      req.body.cart.forEach(perfume => {
        console.log(perfume.email)
        User.update(
          {email: perfume.email},
          {"$inc": {"points": parseInt(req.body.sum)}}
        )
        .then(user => {
          console.log(`${user.email}: ${user.points}`)
          //needs response from server after done updating mongoDB
          res.json (user)
        })
      })
      
      
   

    



    })
    
 
  })
      

    //   Item.findByIdAndRemove(req.body.cart[i]._id)
    //     .then(() => {
    //       console.log('successfully removed');
    //     })

    // }


    // })

 

  

  module.exports = router;