const Projects = require("../data/helpers/projectModel");

async function validateProjectId(req, res, next) {
  const id = Number(req.params.id);
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

module.exports = { validateProjectId };
