const express = require('express');

const router = express.Router();

// import controller functions
const { login, signup} = require('../controllers/user')

//login route
router.post('/login', login)


//signup route
router.post('/signup', signup)

module.exports = router;
