const Equipment = require("../models/EquipmentModel");
const User = require("../models/UserModel");
const WorkoutEvent = require("../models/WorkoutEventModel");
const Workout = require("../models/WorkoutModel");

//-------------------------create new workout Event--------------------------
module.exports.createWorkoutEvent = async (req, res) => {
  console.log("create a workout Event");
  console.log(req.body);
  let event = req.body;
  event.workoutId = event.workoutId.map((item) => item.id).join(", ");
  try {
    const newWorkoutEvent = new WorkoutEvent(event);

    const savedWorkoutEvent = await WorkoutEvent.create(
      newWorkoutEvent.dataValues
    );
    res.status(200).json({
      success: true,
      message: "workout Event creation Successfully.",
      workoutEvent: savedWorkoutEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout Event creation failed",
      error: error.message,
    });
  }
};

//-------------------------get all workouts Events--------------------------
module.exports.getAllWorkoutsEvents = async (req, res) => {
  console.log("get all workouts Events");
  try {
    const workoutsEvents = await WorkoutEvent.findAll();

    res.status(200).json({
      success: true,
      message: "workout events fetched Successfully.",
      workoutsEvents: workoutsEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout events fetch failed",
      error: error.message,
    });
  }
};

//-------------------------update workout events by id--------------------------
module.exports.updateWorkoutEventById = async (req, res) => {
  console.log("update workouts event");
  try {
    // Update multiple properties with their new values
    const result = await WorkoutEvent.update(req.body, {
      where: { id: req.params.id },
    });

    if (result[0] == 1) {
      res.status(200).json({
        success: true,
        message: "workout event updated Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "workout event update failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout event update failed",
      error: error.message,
    });
  }
};

//-------------------------delete workout event by id--------------------------
module.exports.deleteWorkoutEventById = async (req, res) => {
  console.log("delete workouts event");
  try {
    const result = await WorkoutEvent.destroy({
      where: { id: req.params.id },
    });

    if (result[0] == 1) {
      res.status(200).json({
        success: true,
        message: "workout event deleted Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "workout event delete failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout event delete failed",
      error: error.message,
    });
  }
};

//-------------------------get all workouts Events by instructor id--------------------------
module.exports.getAllWorkoutsEventsByInstructor = async (req, res) => {
  console.log("get all workouts Events by instructor id");
  try {
    const workoutsEvents = await WorkoutEvent.findAll({
      where: { trainerId: req.params.id },
    });
    let elements = [];
    for (const element of workoutsEvents) {
      let workouts = [];
      element.workoutId = element?.workoutId?.split(",");
      if (element?.workoutId?.length > 0) {
        element?.workoutId.map(async (item) => {
          const workout = await Workout.findOne({
            where: { id: parseInt(item.trim(), 10) },
          });
          workouts.push(workout.title);
        });
      }
      // const equipment = await Equipment.findOne({where: {id: element.equipmentId}})
      const member = await User.findOne({
        where: { userID: element.memberId },
      });
      elements.push({ workout: workouts, member: member.fullName, element });
    }

    res.status(200).json({
      success: true,
      message: "workout events fetched Successfully.",
      workoutsEvents: elements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout events fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get all workouts Events by member id--------------------------
module.exports.getAllWorkoutsEventsByMember = async (req, res) => {
  console.log("get all workouts Events by member id");
  try {
    const workoutsEvents = await WorkoutEvent.findAll({
      where: { memberId: req.params.id },
    });
    let elements = [];
    for (const element of workoutsEvents) {
      let workouts = [];
      element.workoutId = element?.workoutId?.split(",");
      if (element?.workoutId?.length > 0) {
        element?.workoutId.map(async (item) => {
          const workout = await Workout.findOne({
            where: { id: parseInt(item.trim(), 10) },
          });
          if (workout) workouts.push(workout?.title);
        });
      }
      // const equipment = await Equipment.findOne({where: {id: element.equipmentId}})
      const instructor = await User.findOne({
        where: { userID: element.trainerId },
      });
      elements.push({
        workout: workouts,
        member: instructor.fullName,
        element,
      });
    }

    res.status(200).json({
      success: true,
      message: "workout events fetched Successfully.",
      workoutsEvents: elements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "workout events fetch failed",
      error: error.message,
    });
  }
};
