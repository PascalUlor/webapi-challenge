const Actions = require("../data/helpers/actionModel");

async function validateActionId(req, res, next) {
  const id = Number(req.params.id) || Number(req.action.id);
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

module.exports = { validateActionId };
