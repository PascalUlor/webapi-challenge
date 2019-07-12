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

module.exports = router;
