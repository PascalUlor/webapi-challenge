const Projects = require("../data/helpers/projectModel");

async function validateProjectId(req, res, next) {
  const id = Number(req.params.id) || Number(req.project.id);
  if (id !== undefined && id !== "" && Number(id)) {
    project = await Projects.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "invalid project id"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "invalid id type. Must be a number"
    });
  }
}

async function validateProject(req, res, next) {
  const { name, description } = req.body;
  console.log(req.body);
  if (req.body.name && req.body.description) {
    if (req.body.name !== "" && req.body.description !== "") {
      const newProject = await Projects.insert({ name, description });
      req.project = newProject;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "missing project data"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "missing required fields"
    });
  }
}

module.exports = { validateProjectId, validateProject };
