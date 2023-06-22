// import User model/schema.
const User = require('../models/User');

//login user
const login = async (req, res)=> {
res.json({mssg: 'login user'})
}

//signup user

const signup = async (req, res)=> {
  // destructure the user object
    const { email, password } = req.body
    try { // then create and test user signup.
      const user = await User.signup({email, password})
      // then return res with user's email and created user object.
      res.status(200).json({email, user})

    } catch (error) {
      res.status(400).json({error: error.message})
    }

  }

// export login/signup user functions
  module.exports = {
    login, signup
  }
