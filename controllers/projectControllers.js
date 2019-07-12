const ProjectDb = require("../data/helpers/projectModel");

const getProjects = async (req, res) => {
  try {
    const allData = await ProjectDb.get();

    if (allData) {
      return res.status(200).json({
        status: 200,
        data: allData
      });
    }
    return res.status(404).json({
      status: 404,
      message: "No users available"
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "Users could not be retrieved."
    });
  }
};

const getById = (req, res, statusCode) => {
  return res.status(200).json({
    status: statusCode,
    data: req.project
  });
};

const getProjectById = async (req, res) => {
  return getById(req, res, 200);
};

const createProject = async (req, res) => {
  try {
    return getById(req, res, 201);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "There was an error while saving the post to the database"
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (req.body.name && req.body.description) {
      if (req.body.name !== "" && req.body.description !== "") {
        const projectUpdate = await ProjectDb.update(req.params.id, {
          name,
          description
        });
        return res.status(200).json({
          status: 200,
          data: projectUpdate
        });
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide project detials."
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "The user information could not be modified."
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const removeProject = await ProjectDb.remove(req.params.id);
    return res.status(200).json({
      status: 200,
      data: removeProject
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "The project could not be removed"
    });
  }
};

const getActionByProject = async (req, res) => {
  const id = req.params.id;
  try {
    const projectActions = await ProjectDb.getProjectActions(id);
    if (Object.keys(projectActions).length !== 0) {
      return res.status(200).json({
        status: 200,
        posts: projectActions
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Project has no actions yet"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "There was an error retrieving project from database"
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getActionByProject
};
