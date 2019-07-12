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

module.exports = {
  getProjects,
  getProjectById
};
