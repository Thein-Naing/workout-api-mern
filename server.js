// import all dependencies.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const workouts = require('./routes/workouts.js');


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

// connect MongoDB.
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, ()=> {
    console.log(`Connected to DB and server is connected on port ${PORT}`)
  });
})
.catch((error) => {
  console.log({mssg: error.message})
})
//listen for requests aka connected to server.
// app.listen(process.env.PORT, ()=> {
//   console.log(`Server is connected on port ${PORT}`)
// })
