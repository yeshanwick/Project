const { Op } = require("sequelize");
const Equipment = require("../models/EquipmentModel");

//-------------------------create new Equipment--------------------------
module.exports.createEquipment = async (req, res) => {
  console.log("create a Equipment");
  try {
    const newEquipment = new Equipment(req.body);
    const existingEquipment = await Equipment.findOne({
      where: { name: newEquipment.name },
    });
    if (existingEquipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment creation failed. Name is already available.",
      });
    }
    const savedEquipment = await Equipment.create(newEquipment.dataValues);
    res.status(200).json({
      success: true,
      message: "Equipment creation Successfully.",
      equipment: savedEquipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Equipment creation failed",
      error: error.message,
    });
  }
};

//-------------------------get all Equipment--------------------------
module.exports.getAllEquipments = async (req, res) => {
  console.log("get all Equipment");
  try {
    const equipments = await Equipment.findAll();

    res.status(200).json({
      success: true,
      message: "Equipment fetched Successfully.",
      equipments: equipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Equipment fetch failed",
      error: error.message,
    });
  }
};

//-------------------------update Equipment by id--------------------------
module.exports.updateEquipmentById = async (req, res) => {
  console.log("update Equipment");
  try {
    // Update multiple properties with their new values
    const result = await Equipment.update(req.body, {
      where: { id: req.params.id },
    });

    if (result[0] == 1) {
      res.status(200).json({
        success: true,
        message: "Equipment updated Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Equipment update failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Equipment update failed",
      error: error.message,
    });
  }
};

//-------------------------delete Equipment by id--------------------------
module.exports.deleteEquipmentById = async (req, res) => {
  console.log("delete Equipment");
  try {
    const equipment = await Equipment.findOne({
      where: { id: req.params.id }
    });
    if(equipment.availableCount !== equipment.totalCount) {
     return res.status(400).json({
        success: false,
        message: "Equipment is using. Can't delete.",
      });
    }
    const result = await Equipment.destroy({
      where: { id: req.params.id },
    });

    if (result == 1) {
      res.status(200).json({
        success: true,
        message: "Equipment deleted Successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Equipment delete failed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Equipment delete failed",
      error: error.message,
    });
  }
};

//-------------------------get Equipment by id--------------------------
module.exports.getEquipmentById = async (req, res) => {
  console.log("get Equipment by id");
  try {
    const equipment = await Equipment.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "Equipment fetched Successfully.",
      equipment: equipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Equipment fetch failed",
      error: error.message,
    });
  }
};

//-------------------------get available Equipment--------------------------
module.exports.getAvailableEquipment = async (req, res) => {
  console.log("get available Equipment");
  try {
    const equipments = await Equipment.findAll({
      where: { availableCount: { [Op.gt]: 0 } },
    });

    res.status(200).json({
      success: true,
      message: "available Equipment fetched Successfully.",
      equipments: equipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "available Equipment fetch failed",
      error: error.message,
    });
  }
};
