const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Define user schema

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true},
  password: {type: String, required: true},  // hello123 -> sfafa04218491fasfannafanskxcnaxkn
  firstName: {type: String},
  lastName: {type: String},
  points: {type:Number, default: 500},
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});


// Before we save the user, make sure we hash the password
UserSchema.pre("save", function(next) {
    const user = this;
    const saltRounds = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  // encrypting process: salting and hashing passord.
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User; 