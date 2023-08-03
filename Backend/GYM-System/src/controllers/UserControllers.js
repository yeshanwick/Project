const { Sequelize } = require("sequelize");
const userRoles = require("../config/UserRoles");
const User = require("../models/UserModel");

//-------------------------get all users--------------------------
module.exports.getAllUsers = async (req, res) => {
  console.log("Get all users");
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ["password"], // Exclude the 'password' property
      },
    });

    res.status(200).json({
      success: true,
      message: "Users fetched Successfully.",
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get all members--------------------------
module.exports.getAllMembers = async (req, res) => {
  console.log("get all members");
  try {
    const allMembers = await User.findAll({
      where: { userRole: userRoles.MEMBER },
      attributes: {
        exclude: ["password"], // Exclude the 'password' property
      },
      include: [
        {
          model: User,
          as: "instructor",
          attributes: {
            exclude: ["password"], // Exclude the 'password' property
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Members fetched Successfully.",
      users: allMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Members fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get all Instructors--------------------------
module.exports.getAllInstructors = async (req, res) => {
  console.log("get all Instructors");
  try {
    const allInstructors = await User.findAll({
      where: { userRole: userRoles.INSTRUCTOR },
      attributes: {
        exclude: ["password"], // Exclude the 'password' property
      },
      include: [
        {
          model: User,
          as: "members",
          attributes: {
            exclude: ["password"], // Exclude the 'password' property
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Instructors fetched Successfully.",
      users: allInstructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Instructors fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get member by ID--------------------------
module.exports.getMemberById = async (req, res) => {
  console.log("get member by ID");
  try {
    const member = await User.findOne({
      where: { userID: req.params.userID },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: User,
          as: "instructor",
          attributes: {
            exclude: ["password"], // Exclude the 'password' property
          },
        },
      ],
    });
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found for the userID",
      });
    }
    res.status(200).json({
      success: true,
      message: "member fetched Successfully.",
      member: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "member fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get instructor by ID--------------------------
module.exports.getInstructorById = async (req, res) => {
  console.log("get instructor by ID");
  try {
    const instructor = await User.findOne({
      where: { userID: req.params.userID },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: User,
          as: "members",
          attributes: {
            exclude: ["password"], // Exclude the 'password' property
          },
        },
      ],
    });
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "instructor not found for the userID",
      });
    }
    res.status(200).json({
      success: true,
      message: "instructor fetched Successfully.",
      instructor: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "instructor fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get user count based on user roles--------------------------
module.exports.getUserCountForRoles = async (req, res) => {
  console.log("get user by ID");
  try {
    const userCounts = await User.findAll({
      attributes: [
        "userRole",
        [Sequelize.fn("COUNT", Sequelize.col("userID")), "count"],
      ],
      group: ["userRole"],
    }); // userCounts will contain an array of objects with 'role' and 'count' properties

    res.status(200).json({
      success: true,
      message: "user count fetched Successfully.",
      count: userCounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User count fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get New Registrants--------------------------
module.exports.getNewRegistrants = async (req, res) => {
  console.log("get New Registrants");
  try {
    const newRegistrants = await User.findAll({
      where: { userRole: userRoles.MEMBER, instructorId: null },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json({
      success: true,
      message: "New Registrants fetched Successfully.",
      members: newRegistrants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "New Registrants fetch failed",
      error: error.message,
    });
  }
};

//-------------------------member assign To Instructor--------------------------
module.exports.assignToInstructor = async (req, res) => {
  console.log("member assign To Instructor");
  const { userID, instructorID } = req.body;
  try {
    const result = await User.update(
      { instructorId: instructorID }, // Update the desired property with the specified value
      { where: { userID: userID } }
    );

    if (result[0] === 1) {
      res.status(200).json({
        success: true,
        message: "Member assign To Instructor Successful.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Member assign To Instructor not Successful.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Assign failed",
      error: error.message,
    });
  }
};

//-------------------------get Members Assign To the Instructor--------------------------
module.exports.getMembersAssignToInstructor = async (req, res) => {
  console.log("get Members Assign To the Instructor");
  try {
    const members = await User.findAll({
      where: { instructorId: req.params.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: User,
          as: "instructor",
          attributes: {
            exclude: ["password"], // Exclude the 'password' property
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "members fetched Successfully.",
      members: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "members fetch failed",
      error: error.message,
    });
  }
};

//-------------------------delete member by id--------------------------
module.exports.deleteMember = async (req, res) => {
  console.log("delete member");
  try {
    const user = await User.findOne({
      where: { userID: req.params.id }
    });
    if (user.userRole === userRoles.INSTRUCTOR) {
      const isInstructor = await User.findOne({
        where: { instructorId: req.params.id }
      });
      if (isInstructor) {
        return res.status(400).json({
          success: false,
          message: "Instructor can't delete Members are assigned to this Instructor.",
        });
      }
    }
    const result = await User.destroy({
      where: { userID: req.params.id },
    });

    if (result == 1) {
      res.status(200).json({
        success: true,
        message: "Member deleted Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Member delete failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Member delete failed",
      error: error.message,
    });
  }
};


//-------------------------get user count based on user age--------------------------
module.exports.getUserCountByAge = async (req, res) => {
  console.log("get user by age");
  try {
    const users = await User.findAll();
    let fifteenToTowentyFive = 0;
    let towentyFiveToThirtyFive = 0;
    let thirtyFiveToFourtyFive = 0;
    let fourtyFiveToFiftyFive = 0;
    let overFiftyFive = 0;


    for (const user of users) {
      // const age = calculateAge(user?.dob);
      if (user?.userRole == userRoles.MEMBER) {
        const dobDate = new Date(user?.dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const dobMonth = dobDate.getMonth();
        const todayMonth = today.getMonth();

        if (todayMonth < dobMonth || (todayMonth === dobMonth && today.getDate() < dobDate.getDate())) {
          age--;
        }
        if (age >= 15 && age < 25) {
          fifteenToTowentyFive++;
        } else if (age >= 25 && age < 35) {
          towentyFiveToThirtyFive++;
        } else if (age >= 35 && age < 45) {
          thirtyFiveToFourtyFive++;
        } else if (age >= 45 && age < 55) {
          fourtyFiveToFiftyFive++;
        } else if (age >= 55) {
          overFiftyFive++;
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "user count fetched Successfully.",
      count: [{ ageLimit: '15 - 25', count: fifteenToTowentyFive }, { ageLimit: '25 - 35', count: towentyFiveToThirtyFive },
      { ageLimit: '35 - 45', count: thirtyFiveToFourtyFive }, { ageLimit: '45 - 55', count: fourtyFiveToFiftyFive },
      { ageLimit: 'over 55', count: overFiftyFive }]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User count fetch failed",
      error: error.message,
    });
  }
};
