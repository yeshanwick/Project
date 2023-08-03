const WorkoutEvent = require("../models/WorkoutEventModel");
const Workout = require("../models/WorkoutModel");

//-------------------------create new workouts--------------------------
module.exports.createWorkout = async (req, res) => {
  console.log("create a workout");
  try {
    const newWorkout = new Workout(req.body);
    const existingWorkout = await Workout.findOne({
      where: { title: newWorkout.title },
    });
    if (existingWorkout) {
      return res.status(404).json({
        success: false,
        message: "workout creation failed. Title is already available.",
      });
    }
    const savedWorkout = await Workout.create(newWorkout.dataValues);
    res.status(200).json({
      success: true,
      message: "workout creation Successfully.",
      workout: savedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout creation failed",
      error: error.message,
    });
  }
};

//-------------------------get all workouts--------------------------
module.exports.getAllWorkouts = async (req, res) => {
  console.log("get all workouts");
  try {
    const workouts = await Workout.findAll();

    res.status(200).json({
      success: true,
      message: "workout fetched Successfully.",
      workouts: workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout fetch failed",
      error: error.message,
    });
  }
};

//-------------------------update workout by id--------------------------
module.exports.updateWorkoutById = async (req, res) => {
  console.log("update workouts");
  try {
    // Update multiple properties with their new values
    const result = await Workout.update(req.body, {
      where: { id: req.params.id },
    });

    if (result[0] == 1) {
      res.status(200).json({
        success: true,
        message: "workout updated Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "workout update failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout update failed",
      error: error.message,
    });
  }
};

//-------------------------delete workout by id--------------------------
module.exports.deleteWorkoutById = async (req, res) => {
  console.log("delete workouts");
  try {
    const events = await WorkoutEvent.findAll();
    for (const event of events) {
      const ids = event.workoutId.split(',');
      for(const id of ids) {
        if(Number(id) == req.params.id) {
          return res.status(400).json({
            success: false,
            message: "workout delete failed. Workout has used in workout event.",
          });
        }
      }
      
    }
    const result = await Workout.destroy({
      where: { id: req.params.id },
    });

    if (result == 1) {
      res.status(200).json({
        success: true,
        message: "workout deleted Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "workout delete failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout delete failed",
      error: error.message,
    });
  }
};

//-------------------------get workout by id--------------------------
module.exports.getWorkoutById = async (req, res) => {
  console.log("get workout by id");
  try {
    const workout = await Workout.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "workout fetched Successfully.",
      workout: workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout fetch failed",
      error: error.message,
    });
  }
};
