const express = require("express");
const { createEquipment, getAllEquipments, updateEquipmentById, deleteEquipmentById, getEquipmentById, getAvailableEquipment } = require("../controllers/EquipmentControllers");

const router = express.Router();

router.get("/all", function (req, res) {
  res.send(
    "Hello World from API. \n /add \n /getall \n /update \n /delete \n /getById \n"
  );
});

router.post("/add", createEquipment);
router.get("/getall",getAllEquipments);
router.put("/update/:id", updateEquipmentById);
router.delete("/delete/:id", deleteEquipmentById);
router.get("/getById/:id", getEquipmentById);
router.get("/available/getall", getAvailableEquipment);


module.exports = router;
