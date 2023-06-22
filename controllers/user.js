// import User model/schema.
const User = require('../models/User');

//login user
const login = async (req, res)=> {
res.json({mssg: 'login user'})
}

//signup user

const signup = async (req, res)=> {
  res.json({mssg: 'signup user'})
  }

// export login/signup user functions
  module.exports = {
    login, signup
  }
