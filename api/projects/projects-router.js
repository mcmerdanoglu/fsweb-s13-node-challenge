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
    const insertedProject = await projectsModel.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(201).json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectPayload,
  (req, res, next) => {
    try {
    } catch (error) {}
  }
);

router.delete("/:id", mw.validateProjectId, (req, res, next) => {});

router.get("/:id/actions", mw.validateProjectId, (req, res, next) => {});

module.exports = router;
