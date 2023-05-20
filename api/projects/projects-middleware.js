// projects ara yazılımları buraya
const projectsModel = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const isExistingProject = await projectsModel.get(req.params.id);
    if (!isExistingProject) {
      res.status(404).json({ message: "Böyle bir proje bulunmamaktadır" });
    } else {
      req.currentProject = isExistingProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProjectPayload(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        message:
          "Lütfen name ve description alanlarının dolu olduğundan emin olun",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateProjectId, validateProjectPayload };
