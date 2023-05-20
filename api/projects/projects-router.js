// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");
const mw = require("./projects-middleware");
const { json } = require("express");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectsModel.get();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateProjectId, (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateProjectPayload, async (req, res, next) => {
  try {
    let model = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    };
    const insertedProject = await projectsModel.insert(model);
    res.status(201).json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectPayload,
  async (req, res, next) => {
    try {
      let model = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      };
      const updatedProject = await projectsModel.update(req.params.id, model);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
  try {
    // Silinen nesne ekrana yazılsın istenirse bu şekilde yazılabilir fakat modelde silinen nesne sayısı dönecek şekilde yazıldığı için yorumlaştırldı.
    /* const deletedProject = await projectsModel.remove(req.params.id);
     res.json({ message: "Silme işlemi başarılı", deletedProject }) veya res.json({ message: "Silme işlemi başarılı"}, deletedProject) ;*/
    await projectsModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  try {
    const projectActions = await projectsModel.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
