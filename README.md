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

  // destructure the user object
  
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








