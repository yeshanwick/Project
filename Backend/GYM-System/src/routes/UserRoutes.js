const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/AuthControllers");
const {
  getAllUsers,
  getAllMembers,
  getAllInstructors,
  getUserCountForRoles,
  getMemberById,
  getInstructorById,
  getNewRegistrants,
  assignToInstructor,
  getMembersAssignToInstructor,
  deleteMember,
  getUserCountByAge,
} = require("../controllers/UserControllers");
const router = express.Router();

router.get("/all", function (req, res) {
  res.send(
    "Hello World from API. \n /registerUser \n /loginUser \n /getall \n /getallMembers \n /getallInstructors \n /getMemberById \n /getInstructorById \n /getUserCountForRoles \n /getNewRegistrants \n /assignToInstructor \n"
  );
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getall", getAllUsers);
router.get("/getallMembers", getAllMembers);
router.get("/getallInstructors", getAllInstructors);
router.get("/getMemberById/:userID", getMemberById);
router.get("/getInstructorById/:userID", getInstructorById);
router.get("/getUserCountForRoles", getUserCountForRoles);
router.get("/getNewRegistrants", getNewRegistrants);
router.get("/getUserCountByAge", getUserCountByAge);


router.put("/updateUser/:userID", updateUser);
router.put("/assignToInstructor", assignToInstructor);

router.get("/getMembersAssignToInstructor/:id", getMembersAssignToInstructor);
router.delete("/deleteMemberbyId/:id", deleteMember);

module.exports = router;
