const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1.declare middleware
const requireAuth = async (req, res, next)=> {

//2.verify authentication .
// grab authorization(which should contain jwt token) from headers and destructure and declare
  const { authorization} = req.headers

//3.verify authorization exist
  if (!authorization) {
    return res.status(401).json({error:'Authorization token required'})
}

//4.if authorization exist get jwt token from const { authorization}
// Authorization: Bearer XXXX XXXX XXXX XXXX XXXX ....
  const token = authorization.split(' ')[1]

//5.import jwt for verify jwt token and add process.env.SECRET as 2nd argument for verify signature
// then grab payload from token as _id. use try and catch.
  try {
    const {_id } = jwt.verify(token, process.env.SECRET)

//6. requireAuth function declare with req . so we will return with this.
 //we need to  import user model.
 // then we will use _id only to verify user.
 // then call next for next request.

 req.user = await User.findOne({_id}).select({_id})
 next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error:'Request is not authorized'})
  }

}

//  then export requireAuth and we will implement in workouts route.
module.exports = requireAuth
