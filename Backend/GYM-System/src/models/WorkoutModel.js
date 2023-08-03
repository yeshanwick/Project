const Sequelize = require("sequelize");

const db = require("../config/DatabaseConnection");
// Define a model
var Workout = db.define(
  "workout",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mainGoal: {
      type: Sequelize.STRING,
    },
    trainingLevel: {
      //beginner, expert
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    targetGender: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    freezeTableName: true,
  }
);

module.exports = Workout;
