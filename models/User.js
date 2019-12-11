const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Define user schema

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: {type: String, required: true},  // hello123 -> sfafa04218491fasfannafanskxcnaxkn
  firstName: {type: String},
  lastName: {type: String}
});


//

const User = mongoose.model('User', UserSchema);

module.exports = User; 