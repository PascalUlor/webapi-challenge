const Actions = require("../data/helpers/actionModel");

async function validateActionId(req, res, next) {
  const id = Number(req.newaction.id) || Number(req.params.id);
  if (id !== undefined && id !== "" && typeof id === "number") {
    action = await Actions.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "invalid user id"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "invalid id type"
    });
  }
}

async function validateAction(req, res, next) {
  const { notes, description } = req.body;
  const projectId = req.params.id;
  if (req.body.notes && req.body.description) {
    if (req.body.notes !== "" && req.body.description !== "") {
      const newAction = await Actions.insert({
        notes,
        description,
        project_id: projectId
      });
      req.newaction = newAction;
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "missing text data"
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "missing required text field"
    });
  }
}

module.exports = { validateActionId, validateAction };
