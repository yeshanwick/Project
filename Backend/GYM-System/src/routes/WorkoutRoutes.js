const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  updateWorkoutById,
  deleteWorkoutById,
  getWorkoutById,
} = require("../controllers/WorkoutControllers");

const router = express.Router();

router.get("/all", function (req, res) {
  res.send(
    "Hello World from API. \n /add \n /getall \n /update \n /delete \n /getById \n"
  );
});

router.post("/add", createWorkout);
router.get("/getall", getAllWorkouts);
router.put("/update/:id", updateWorkoutById);
router.delete("/delete/:id", deleteWorkoutById);
router.get("/getById/:id", getWorkoutById);

module.exports = router;
