const express = require("express");
const projectControllers = require("../controllers/projectControllers");
const ProjectHelper = require("../middleware/projectHelper");

const router = express.Router();

router.get("/", projectControllers.getProjects);

router.get(
  "/:id",
  ProjectHelper.validateProjectId,
  projectControllers.getProjectById
);

router.post(
  "/",
  ProjectHelper.validateProject,
  ProjectHelper.validateProjectId,
  projectControllers.createProject
);

module.exports = router;
