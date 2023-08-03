const express = require("express");
const { createWorkoutEvent, getAllWorkoutsEvents, updateWorkoutEventById, deleteWorkoutEventById, getAllWorkoutsEventsByInstructor, getAllWorkoutsEventsByMember } = require("../controllers/WorkoutEventControllers");


const router = express.Router();

router.get("/all", function (req, res) {
  res.send(
    "Hello World from API. \n /add \n /getall \n /update \n /delete \n /getById \n"
  );
});

router.post("/add", createWorkoutEvent);
router.get("/getall", getAllWorkoutsEvents);
router.put("/update/:id", updateWorkoutEventById);
router.delete("/delete/:id", deleteWorkoutEventById);

router.get("/getByInstructorID/:id", getAllWorkoutsEventsByInstructor);
router.get("/getByMemberID/:id", getAllWorkoutsEventsByMember);

router.put("/mark/attendance/:id", updateWorkoutEventById);


module.exports = router;
