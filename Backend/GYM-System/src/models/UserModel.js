const Sequelize = require("sequelize");

const db = require("../config/DatabaseConnection");
const WorkoutEvent = require("./WorkoutEventModel");
const UserRequest = require("./UserRequests");
// Define a model
var User = db.define(
  "user",
  {
    userID: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nic: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userRole: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    height: {
      type: Sequelize.FLOAT,
    },
    city: {
      type: Sequelize.STRING,
    },
    branch: {
      type: Sequelize.STRING,
    },
    purpose: {
      type: Sequelize.STRING,
    },
    specialty: {
      type: Sequelize.STRING,
    },
    personalInfo: {
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

// Define the relationship
User.hasMany(User, {
  as: "members",
  foreignKey: {
    allowNull: true,
    name: "instructorId",
    unique: false,
  },
});
User.belongsTo(User, {
  as: "instructor",
  foreignKey: {
    allowNull: true,
    name: "instructorId",
    unique: false,
  },
});

User.hasMany(WorkoutEvent, {
  foreignKey: 'memberId',
  as: 'memberEvents',
});

User.hasMany(WorkoutEvent, {
  foreignKey: 'trainerId',
  as: 'trainerEvents',
});

User.hasMany(UserRequest, { as: 'memberRequest', foreignKey: 'memberId' });
module.exports = User;
