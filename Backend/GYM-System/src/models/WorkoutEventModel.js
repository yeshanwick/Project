const Sequelize = require("sequelize");

const db = require("../config/DatabaseConnection");
const User = require("./UserModel");
// Define a model
var WorkoutEvent = db.define(
  "workoutEvent",
  {
    memberId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "userID",
      },
    },
    trainerId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "userID",
      },
    },
    workoutId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // equipmentId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "equipment",
    //     key: "id",
    //   },
    // },
    numberOfSessions: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    completedSessions: {
      type: Sequelize.INTEGER,
      default: 0,
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

module.exports = WorkoutEvent;
