const Sequelize = require("sequelize");

const db = require("../config/DatabaseConnection");
const User = require("./UserModel");
const Equipment = require("./EquipmentModel");
const WorkoutEvent = require("./WorkoutEventModel");
// Define a model
var UserRequest = db.define(
  "userRequest",
  {
    memberId: {
      type: Sequelize.STRING,
      allowNull: false,
    //   references: {
    //     model: "user",
    //     key: "userID",
    //   },
    },
    equipmentId: {
      type: Sequelize.STRING
      ,
      allowNull: false,
    //   references: {
    //     model: "equipment",
    //     key: "id",
    //   },
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      default: 0,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    freezeTableName: true,
  }
);


module.exports = UserRequest;
