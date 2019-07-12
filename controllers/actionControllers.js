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

module.exports = {
  getAllActions
};
