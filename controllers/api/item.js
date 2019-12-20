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
  const qty = req.body.qty;
  const points= req.body.points;
  const description= req.body.description;
  const oz=req.body.oz;
  

  Item.create({
    name,
    qty,
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
    
    // Remove those points from user
    db.sales.aggregate([{ $project: { item: 1, total: { $subtract: [{ $add: ["$price", "$fee"] }, "$discount"] } } }])
    User.aggregate([
      {$project: 
        { _id: req.user._id, $points: { $subtract: ["$points", +req.body.sum] } }
      }  
    ])
    .then(user => {
      res.json('hello')
    })

    
 

      // for(let i = 0; i < req.body.cart.length; i++) {

    //   User.find({
    //     items: req.body.cart[i]._id
    //   })
    //   .then(user => {
    //     console.log(user)
    //     user.points = user.points + req.body.cart[i].points;
    //     user.save()
    //   })

    //   Item.findByIdAndRemove(req.body.cart[i]._id)
    //     .then(() => {
    //       console.log('successfully removed');
    //     })

    // }


    // })




    

  })

  module.exports = router;