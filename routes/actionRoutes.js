const express = require("express");
const ActionControllers = require("../controllers/actionControllers");

const router = express.Router();

router.get("/", ActionControllers.getAllActions);

module.exports = router;
