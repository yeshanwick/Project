// Import required packages
const express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const cors = require("cors");

// import database connection Database
var db = require("./src/config/DatabaseConnection"); 
const dbSync = require("./src/config/DatabaseSync");

// Import routes
var userRoutes = require("./src/routes/UserRoutes");
var workoutRoutes = require("./src/routes/WorkoutRoutes");
var equipmentRoutes = require("./src/routes/EquipmentRoutes");
var events = require("./src/routes/WorkoutEventRoutes");
var request = require("./src/routes/UserRequestRoutes");



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get the port from .env
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/event", events);
app.use("/api/request", request);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  db.authenticate()
    .then(() => {
      console.log("Database Connection has been established successfully.");
      dbSync();
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error.message);
    });
});
