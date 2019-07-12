const express = require("express");
const projectControllers = require("../controllers/projectControllers");

const router = express.Router();

router.get("/", projectControllers.getProjects);

module.exports = router;
