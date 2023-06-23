// import User model/schema.
const User = require("../models/User");

// import jwt
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create jwt token here.
    const token = createToken(user._id);

    // then send token back to browser
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


//signup user
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // create jwt token here.
    const token = createToken(user._id);

    // then send token back to browser
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export login/signup user functions
module.exports = { login, signup };
