const express = require("express");
const router = express.Router();
const transcationController = require("../controllers/transactionController");

router.get("/userDetails/:address", transcationController.getUserDetails);
router.get("/deals/:address1/:address2", transcationController.dealing);

module.exports = router;
