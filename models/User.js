const mongoose = require('mongoose');

//import bcrypt.
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }

});

// static signup method
User.statics.signup = async (email, password)=> {
// 1st we will check email is already exist.we do not have user at the moment, so we use this.
const exists = await this.findOne({email})
if(exists) {
  throw Error('Email already in use')
}
//2nd bcrypt force us to use salt and so we have to generate salt
const salt = await bcrypt.genSalt(10)

// hashing salt together with password
const hash = await bcrypt.hash(password, salt)

// then create user using above values and store in database.
// in sql it will be lok like document.
const user = await this.create({email, password: hash})


// return User
return User

}







module.exports = mongoose.model('User', User)
