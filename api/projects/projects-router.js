// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");
const mw = require("./projects-middleware");

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

router.post("/", (req, res, next) => {});

router.put("/:id", mw.validateProjectId, (req, res, next) => {});

router.delete("/:id", mw.validateProjectId, (req, res, next) => {});

router.get("/:id/actions", mw.validateProjectId, (req, res, next) => {});

module.exports = router;
