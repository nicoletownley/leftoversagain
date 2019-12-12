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
UserSchema.pre("save", (next) => {
    const user = this;
    const saltRounds = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  // Proper syntax needed for encrypting a password, we salt it (append some random letters) and then hash it.
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 