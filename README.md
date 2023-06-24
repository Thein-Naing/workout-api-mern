# workout-api-mern-backend-Auth
# This is continuation course from netninja.dev MERN crash course. you can buy all at www.netninja.dev.
`[1]`-  `Before deploying in Render.com in my local host frontend and backend are working toghether fine . Now backend is not properly working on Render.com. I will try again tomorrow.`

`[2]`- `I changed folders/ files name and also some codings and css styling as per my layman/idiot understanding.`


<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/ee9c75b7-5537-4f73-9ef7-8df4f2e023ce">




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

`async, await : every single page application interaction with database is nature of async. async will take longer time to return promise so you have to use await (this is my layman/idiot understanding and may be wrong)`

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
  
  jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})

}



`[8]` `Now tested in Postman & checked in mongodb,  our jwt token function  and signup function in user controller is working fine.`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/0c088ab1-65ce-45b7-bc24-a090413d30f0">

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/3061e8c0-1c75-452d-a0cf-94df8c9f5d3e">

`[9]In Postman , we checked returned token , and confirmed 3 parts of jwt token, header, payload and signature. This mean our jwt function is working properly.`
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/284caf12-402e-457d-b431-91fa4a229a62">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/dd413359-0997-4099-a070-7266584adb09">

`[10] I forgot to mention, we have to creat JWT SECRET KEY in .env file. You can generate this secret key by following this steps;`

// cd server/backend then 

// type : node 

// then type require('crypto').randomBytes(64).toString('hex')

// you will get 64 digit secret key & copy and paste it in .env. 

//SECRET= xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

`[11]` `we will create login function inside User model , same procedure as signup except using bcrypt.compare method :`

// use static login method 

userSchema.statics.login = async function (email, password) {

  // we use this instead of User so we must make normal function instead of arrow function.
  

  if (!email || !password) {
  
    throw Error("All field must be filled");
    
  }

  // 1st we will check user with this email is already exist.
  
  const user = await this.findOne({ email });
  
  if (!user) {
  
    throw Error("Incorrect email");
    
  }
  
  // 2nd if user  exist,  we have to match password and hashed password(user.password).
  
  // we will use bcrypt.compare method.
  
  const match = await bcrypt.compare(password, user.password)
  
  if(!match) {
  
    throw Error("Incorrect password");
    
  }

 return user

};




`[12]` `we will also create  login function in controller same procedure as signup as below;`

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

` and  tested in Postman , checked in mongodb and working fine.`



<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/1eab45c5-799a-471b-ad3e-d8ee28e94ed0">

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/13d717f2-8f8f-4071-a8e7-efe1f93afeeb">



`[13]` ` we will create login/logout  and signup UI in frontend. We will create Context hook as belows;`

// 1.import createContext function from react

import { createContext, useReducer } from "react";

//2.then store/create require context for provider & export it.

export const AuthContext = createContext();


//4. then create authReducer function for provider & export.

export const authReducer = (state, action) => {

  // inside function we will handle all cases. here login and logout cases.
  
  // so we will use switch method.
  
  switch(action.type) {
  
    case 'LOGIN':
    
      return {user: action.payload}
      
    case 'LOGOUT':
    
      return {user: null}
      
    default:
    
      return state
      
  } 
  
}

// 3.then using this context to create provider function into our application component tree

//so that all our components can access it.

// provider function take children as argument aka props

// children represent whatever this provider wrap whatever components

export const AuthContextProvider= ({children}) => {

  // register the useReducer state and export it
  
  // 1st argument is authReducer fuction & 2nd argument is initial state value.
  
  const [state, dispatch ] = useReducer(authReducer, {
  
    user: null
    
  })


  //5. test it  and console/log it.
  
  console.log('AuthContext state:', state)
}

 // 6. then wrap children with provider. childern = entire app
 
  return (
  
    <AuthContext.Provider value={{ ...state, dispatch }}>
    
      {children}
      
    </AuthContext.Provider>
    
  );

  // 7. then export to index.js and render it.

import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <React.StrictMode>
  
    <AuthContextProvider>
    
      <WorkoutsContextProvider>
      
        <App />
        
      </WorkoutsContextProvider>
      
    </AuthContextProvider>
    
  </React.StrictMode>
  
);

8.//create useAuthContext.js custom hook.

if we wanna use our AuthContext value /user value on state in any components, we just invoke useAuthContext hook , destructure the user from

context object and also can use in other components as well bec we also declare dispatch.

import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";


export const useAuthContext = () => {

  const context = useContext(AuthContext)
  
  if(!context) {
  
    throw Error('useAuthContext must be ued inside an AuthContextProvider')
    
  }

  return context
}


9.//create Signup.js for signup form in pages folder:

import { useState, useEffect } from "react";

const Signup = () => {

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    
    console.log(email, password);
  };
  
  return (
  
    <form className="signup" onSubmit={handleSubmit}>
    
      <h3>Signup</h3>

      <label>Email:</label>
      
      <input
      
        type="email"
        
        onChange={(e) => setEmail(e.target.value)}
        
        value={email}
        
      />

      <label>Password:</label>
      
      <input
      
        type="password"
        
        onChange={(e) => setPassword(e.target.value)}
        
        value={password}
        
      />
      <button>Sign up </button>
      
    </form>
    
  );
  
};

export default Signup;


// create Login form same as Signup page .

import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Log in</button>
    </form>
  );
};

export default Login;

//then export to route(App.js)

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import WorkoutForm from './components/WorkoutForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='pages'>
          <Routes>

            <Route
            path="/"
            element={ <Home />}
            />

            <Route
            path="/signup"
            element={ <Signup />}
            />

            <Route
            path="/login"
            element={ <Login />}
            />

          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;


//In Navbar.js , create link to login and signup :

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
  
    <header className="container">
    
      <div>
      
        <Link to='/'>
        
        <h1>Workout Buddy</h1>
        
        </Link>
        
        <nav>
        
          <div>
          
          <Link to='/login'>Login</Link>
          
          <Link to='/signup'>Signup</Link>
          
          </div>
          
        </nav>
        
      </div>

    </header>

  )

  }

export default Navbar;

  `[14]` `Already tested in dev tool for login and signup .It is working fine but we need to generate jwt token for safety. So we have to create custom/reusable hooks for Signup/Login/Logout for UI. Now logic is when we click button in Signup/Login components it will invoke console.log(email, password)(we will change logic later) and UI will show us this email and password. We will use the reusable/custom made hooks to handle all of the logic.`

  <img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/e4b453cb-3814-4bc3-aba0-cfcc4e3c56f9">
  <img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/ccb33f42-cb5e-4b91-859c-8141b21f159b">
  <img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/e9d1682a-9e48-4e08-aa53-72bb5be26284">




`[15]` Created useSignup.js hook for Signup form and test it .

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
            //update the auth context
      dispatch({type:'LOGIN', payload:json})

      setIsLoading(false);

    }
  }
  return { signup, isLoading, error}
};


//then export to Signup.js component

// then update Signup.js

import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //invoke useSignup hook
  const {signup, error, isLoading} = useSignup();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    //replace with useSignup hook state
    await signup(email, password)


  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
    
      <h3>Signup</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
            <button disable={isLoading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

// disable button when isLoading is false.

export default Signup;

 `header/payload/signature all are woking. but AuthContext state: is still {user: Null} we have to fix it.`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/cf75ca36-dd57-4320-8d5f-b7ba37305761">

`in local storage , signup user is already saved.`
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/dab467af-cff6-4edf-bc67-45e48297b913">




`[16]` `Also create useLogout.js hook in hooks folder.`

// import useAuthContext

import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

  const { dispatch } = useAuthContext();
  
  const logout = () => {
  
    //remove user from storage
    
    localStorage.setItem("user");

    //dispatch the logout action
    
    dispatch({ type: "LOGOUT" });
    
  };

  return { logout };
  
};


// use this hook inside Navbar. 

`[17]` ` in Navbar , create a button for log0ut, made css styling .et.c. Now we have logout button.`

import { Link } from 'react-router-dom';

//import useLogout

import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

  const { logout } = useLogout()

  const handleClick = () => {
  
    logout()
    
  }

  return (
  
    <header>
      <div className="container">
      
        <Link to="/">
        
          <h1>Workout Buddy</h1>
          
        </Link>
        
        <nav>

                  <div>
          
            <button onClick={handleClick}>Log out</button>
            
          </div>
          
          <div>
          
            <Link to="/login">Login</Link>
            
            <Link to="/signup">Signup</Link>
            
          </div>
          
        </nav>
        
      </div>
      
    </header>
    
  )
  
}

export default Navbar



<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/476520b6-663a-47bb-a1b1-ca9958fa30a8">

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/912ce8a0-224a-4f72-a34d-7e3351fe4c7f">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/a3cacd85-fa6c-42b0-a723-eb185bae9aac">


`[18]` `tested logout function working fine. But we nedd to create useLogin hook also`

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/e0e735bd-89b4-4f07-a598-7a5bfab267dd">

`[19]` `created useLogin hook and implemented in Login form and tested it and all working fine`.

import { useState } from 'react'

import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

  const [error, setError] = useState(null)
  
  const [isLoading, setIsLoading] = useState(null)
  
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
  
    setIsLoading(true)
    
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

`login`
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/f934fca1-512b-4e6b-b1d9-581989dc27fe">
`logout`
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/7cc30511-32ec-4ffe-bb31-8aa2230b853c">


`[20]` `update Navbar for user status and test it ok but when we refresh the page all gone so we have to fix it. `

import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext'


//import useLogout

import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

  const { logout } = useLogout()
  
  const { user } = useAuthContext()
  

  const handleClick = () => {
  
    logout()
    
  }

  return (
  
    <header>
    
      <div className="container">
      
        <Link to="/">

        
          <h1>Workout Buddy</h1>
          
        </Link>
        
        <nav>
          {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>)}
          {!user &&
          (<div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>)}
        </nav>
      </div>
    </header>
  )

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/9993cd67-dc83-411c-b1f3-d169b311977e">



`[21]we updated AuthContext hook as below and test it . Now after refresh, user value is still in server and loging in.`

import { createContext, useReducer, useEffect } from "react";

 //7. import and call useEffect once with JSON.parse.
 
  useEffect(() =>{
  
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (user) {
    
      dispatch({ type:"LOGIN", payload: user})
      
    }
    
  }, [])

<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/444ccf42-ae53-4e8c-a182-8b5fb88ce088">


`[22]` `We will continue to authentication process for individual user for individual workouts . We will create requireAuth.js in middleware folder in backend whcih will fire up before every requests for workouts and prevent untauthorized users from creating workouts.`

 requireAuth.js(in middleware folder in backend)
 
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


`[23]` ` in workouts.js route,requireAuth.js function will be implemented as below and tested in postman with get request, wrong token request  `

const express = require('express');

const router = express.Router();

const Workout = require('../models/Workout');

const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workouts')

// import requireAuth.

const requireAuth = require('../middleware/requireAuth')

// fire first or require requireAuth for all routes to protect or ensure it is authorized before every routes.

router.use(requireAuth)


<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/2a37ea53-1c4b-4260-a2cf-170dd9044956">
<img width="960" alt="image" src="https://github.com/Thein-Naing/workout-api-mern/assets/117463446/757397df-e691-4e42-b149-595eb2c7c758">



