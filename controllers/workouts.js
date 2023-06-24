const Workout = require('../models/Workout');
const mongoose = require('mongoose');



// Get all workouts.
const getWorkouts = async (req, res)=> {
  // we will limit here for individual user_id.
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(workouts)

};

//Get a single workout.
const getWorkout = async(req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout'})
  }
  const workout = await Workout.findById(id)

  if(!workout) {
    return res.status(404).json({error: 'no such workout'})
  }
  res.status(200).json(workout)
};

// Post a new workout.
const createWorkout = async (req, res)=> {
  const { title, reps, load} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }

  if(!load) {
    emptyFields.push('load')
  }

  if(!reps) {
    emptyFields.push('reps')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }
  //add workout to database.
  try {

    // 1.add user_id here.
    //2.grab from req as user_id and use  inside try and catch.

    const user_id = req.user._id

    const workout = await Workout.create({
      //3.then add user_id to workout object.
      title, reps, load, user_id
    })
    res.status(200).json(workout)

  } catch (error) {
    res.status(400).json({error: error.message})
  }
 };


// Update a workout.
const updateWorkout = async (req, res)=> {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id: id}, {
  ...req.body
  })

  if(!workout) {
    return res.status(404).json({error: 'no such workout'})
  }
  res.status(200).json(workout)
};


// Delete a workout.
const deleteWorkout = async (req, res)=> {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such workout'})
  }
  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(404).json({error: 'no such workout'})
  }
  res.status(200).json(workout)
};



module.exports = {
  createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
}
