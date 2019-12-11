const router = require('express').Router();
const Item = require('../../models/Item.js');  

// GET All items

router.get('/', (req, res) => {
  Item.find({})
    .then(items => {
      console.log(items);
      res.json(items)
    })
})


// User hits /item

router.get('/item/:id', (req, res) => {
  Item.find({ _id: req.params.id })
    .then(item => {
      console.log(item);
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
      res.json(item);
    })

  })

  module.exports = router;