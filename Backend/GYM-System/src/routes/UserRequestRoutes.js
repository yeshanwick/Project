const express = require("express");
const { createRequest, getAllRequests, updateRequest, getAllRequestsByTrainer, getAllRequestsByMember, deleteRequest } = require("../controllers/RequestControllers");

const router = express.Router();

router.get("/all", function (req, res) {
  res.send(
    "Hello World from API. \n /add \n /getall \n /update \n /delete \n /getById \n"
  );
});

router.post("/add", createRequest);
router.get("/getall",getAllRequests);
router.put("/reject/", updateRequest);
router.put("/accept/", updateRequest);
router.put("/cancel/", updateRequest);
router.delete("/delete/:id", deleteRequest);


router.get("/getallByMember/:id",getAllRequestsByMember);
router.get("/getallByTrainer/:id",getAllRequestsByTrainer);

module.exports = router;
