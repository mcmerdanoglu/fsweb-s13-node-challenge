// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const isExistingAction = await actionsModel.get(req.params.id);
    if (!isExistingAction) {
      res.status(404).json({ message: "Böyle bir action bulunmamaktadır" });
    } else {
      req.currentAction = isExistingAction;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionId,
};
