const mongoose = require('mongoose');

// Define Item schema

const ItemSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },  // hello123 -> sfafa04218491fasfannafanskxcnaxkn
  oz: {type:Number},
  description: {type: String},
  points: {type: Number, default: 50},
});
 


//

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item; 