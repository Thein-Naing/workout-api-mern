// import all dependencies.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const workouts = require('./routes/workouts.js');
const bodyParser = require("body-parser");


//create express app.
const app = express();


//middleware.
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/workouts', workouts);
app.use(bodyParser.json());

// connect MongoDB.
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, ()=> {
    console.log(`Connected to DB and server is connected on port ${PORT}`)
  });
})
.catch((error) => {
  console.log({message: error.message})
})
//listen for requests aka connected to server.
// app.listen(process.env.PORT, ()=> {
//   console.log(`Server is connected on port ${PORT}`)
// })
