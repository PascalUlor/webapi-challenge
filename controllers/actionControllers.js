const ActionDb = require("../data/helpers/actionModel");

const getAllActions = async (req, res) => {
  try {
    const allActions = await ActionDb.get();
    if (allActions) {
      return res.status(200).json({
        status: 200,
        data: allActions
      });
    }
    return res.status(404).json({
      status: 404,
      message: "No actions available"
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "This information could not be retrieved."
    });
  }
};

const getById = (req, res, statusCode) => {
  return res.status(200).json({
    status: statusCode,
    data: req.action
  });
};

const getActionById = async (req, res) => {
  return getById(req, res, 200);
};

const createAction = async (req, res) => {
  try {
    return getById(req, res, 201);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "There was an error while saving the post to the database"
    });
  }
};

const updateAction = async (req, res) => {
  try {
    const { notes, description } = req.body;
    const actionId = req.params.id;
    if (req.body.notes && req.body.description) {
      if (req.body.notes !== "" && req.body.description !== "") {
        const actionUpdate = await ActionDb.update(actionId, {
          notes,
          description
        });
        return res.status(200).json({
          status: 200,
          data: actionUpdate
        });
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please action details."
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "This  information could not be modified."
    });
  }
};

module.exports = {
  getAllActions,
  getActionById,
  createAction,
  updateAction
};
