// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectsModel = require("../projects/projects-model");

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

async function validateActionPayload(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;
    if (
      typeof project_id !== "number" ||
      project_id <= 0 ||
      !description ||
      !notes
    ) {
      res.status(400).json({ message: "İlgili alanları kontrol ediniz" });
    } else {
      const existingProject = await projectsModel.get(project_id);
      if (!existingProject) {
        res
          .status(400)
          .json({ message: "Geçersiz proje idsi, lütfen kontrol ediniz" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionId,
  validateActionPayload,
};
