const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

router.get("/transaction/:address", controller.transcation);
router.post("/register_address", controller.registerAddress);

router.get("/ethereum", controller.ethereum);
router.post("/add", controller.registerCurrency);
router.get("/geteth", controller.geteth);

module.exports = router;
