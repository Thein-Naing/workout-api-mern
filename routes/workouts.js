const express = require('express');

const router = express.Router();

const Workout = require('../models/Workout');

const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workouts')

// import requireAuth.
const requireAuth = require('../middleware/requireAuth')

// fire first or require requireAuth for all routes to protect or ensure it is authorized before every routes.
router.use(requireAuth)

//attach handlers for all workouts.

// Get all workouts.
router.get('/', getWorkouts);


//Get a single workout.
router.get('/:id', getWorkout);

// Post a new workout.
router.post('/', createWorkout);


// Update a workout.
router.patch('/:id', updateWorkout);

// Delete a workout.
router.delete('/:id', deleteWorkout);





module.exports = router;
