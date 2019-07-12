const express = require("express");
const ActionControllers = require("../controllers/actionControllers");
const ActionHelper = require("../middleware/actionHelper");

const router = express.Router();

router.get("/", ActionControllers.getAllActions);
router.get(
  "/:id",
  ActionHelper.validateActionId,
  ActionControllers.getActionById
);

router.post(
  "/:id/project",
  ActionHelper.validateAction,
  ActionHelper.validateActionId,
  ActionControllers.createAction
);

router.put(
  "/:id",
  ActionHelper.validateActionId,
  ActionControllers.updateAction
);

router.delete(
  "/:id",
  ActionHelper.validateActionId,
  ActionControllers.deleteAction
);

module.exports = router;
