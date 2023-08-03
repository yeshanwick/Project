var db = require("./DatabaseConnection"); // import database connection Database

// Import Models
const User = require("../models/UserModel");
const Workout = require("../models/WorkoutModel");
const Equipment = require("../models/EquipmentModel");
const WorkoutEvent = require("../models/WorkoutEventModel");
const UserRequest = require("../models/UserRequests");

const runSeeders = require("./seeders");

const dbSync = () => {
  db.sync()
    .then(() => {
      console.log("Models synchronized with the database.");
      runSeeders();
    })
    .catch((error) => {
      console.error(
        "Error synchronizing models with the database:",
        error.message
      );
    });
};

module.exports = dbSync;
