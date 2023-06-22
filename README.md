# workout-api-mern-backend-Auth
# This is continuation course from netninja.dev MERN crash course. you can buy all at www.netninja.dev.
`[1]`-  `Before deploying in Render.com in my local host frontend and backend are working toghether fine . Now backend is not properly working on Render.com. I will try again tomorrow.`

`[2]`- `I changed folders/ files name and also some codings and css styling as per my layman/idiot understanding.`


<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/eddbc3a3-9b52-4f96-8a97-71da04e66ae2">



`[3]` `Now create user model/controller/routes and test in postman . Now working fine for user  and will add required coding.`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/9a2cf23b-af93-497d-90d8-361eaa96b439">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/7e2a4c5d-71ec-4775-9536-bc7ba3af71a1">



`[4]` `Clarification notes`

`express : Express is minimal and flexible Node.js web applicaton framework.`

`mongoose : Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.`

`jsonwebtoken : It's a compact URL of representing claims to be transferred between two parties.`

`bcrypt : It's a password hashing function. It force us to use salt.`

`joi : Joi is an object schema description language and validator for javascript objects.`

`dotenv : It loads environment variables from a .env file.`

`salt : random string of characters that gets added to user's password before it's get hashed.`

`async, await : every single page application interaction with database is nature of async. async will take longer time to return promise so you have to use await (this is my layman/idiot understanding may be wrong)`

`[5]` `For login and signup we need to use bcrypt/jwt/joi and e.t.c.`

npm i bcrypt


 Firstly we will create new user function in User model using User schema . we will use so called statics signup method and e.t.c as follows;


// use static signup method

User.statics.signup = async (email, password)=> {


// 1st we will check email is already exist.we do not have user at the moment, so we use this.

const exists = await this.findOne({email})

if(exists) {

  throw Error('Email already in use')
  
}

//2nd bcrypt force us to use salt and so we have to generate salt

const salt = await bcrypt.genSalt(10) // default for salt is 10.

// hashing salt together with password

const hash = await bcrypt.hash(password, salt)

// then create user using above values and store in database.

// in sql it will be look like document.

const user = await this.create({email, password: hash})


// return created user (not User model)

return user

}


`[6]` `we will create signup function  fully in controller like that;` 

const signup = async (req, res)=> {

  // destructure the user object by grabbing from req
  
    const { email, password } = req.body
    
    try { // then create and test user signup.
    
      const user = await User.signup(email, password)
      
      // then return res with user's email and created user object.
      
      res.status(200).json({email, user})

    } catch (error) {
    
      res.status(400).json({error: error.message})
    }

  }

  we also need to change arrow function to normal function in User model statics method because we use this instead of User ;

  // use static signup method
  
// User.statics.signup = async (email, password)=> {

  // we use this instead of User so we must make normal function instead of arrow function.
  
User.statics.signup = async function (email, password) {
...
....}

`we will test this function in postman first. we got it hashed password and unique id in post man .It means our signup function with bcrypt/salt hashing is working fine.`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/806f6dcc-4e38-4e5b-8acc-0a1019950af9">

`[7]` `We have to validate before checking user email exist `
 So we install validator package  npm i validator and test in User model as follow and we will also test in postman. 
 
 // validation
 
if (!email || !password) {

  throw Error('All fields must be filled')
  
}

if(!validator.isEmail(email)) {

  throw Error('Email is not valid')
  
}

if(!validator.isStrongPassword(password)) {

  throw Error('Password is not strong enough')
  
}


`tests in Postman are working fine.`
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/ecc83923-2cfa-4542-bbc4-c27b45c128b4">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/710aa447-1dae-400c-8c21-ede9a7d9c67b">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/44ea0617-b111-4ea3-a247-13f65253c6cb">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/dba0f3be-e24a-4c1f-afe7-27264f903608">

`[7]` `we will add jwt into our user controller so that we can generate jwt token when user signup function fire up.`

npm i jsonwebtoken

const jwt = require('jsonwebtoken');

const createToken = (_id) => {

  return
  
  jwt.sign({_id}, process.env.JWTSECRET_KEY, {expiresIn: '3d'})

}



`[8]` `Now tested in Postman & checked in mongodb,  our jwt token function is working fine.`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/0c088ab1-65ce-45b7-bc24-a090413d30f0">

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/3061e8c0-1c75-452d-a0cf-94df8c9f5d3e">

in Postman , we checked returned token , and confirmed 3 parts of jwt token, header, payload and signature. This mean our jwt function is working properly.
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/284caf12-402e-457d-b431-91fa4a229a62">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/dd413359-0997-4099-a070-7266584adb09">
















