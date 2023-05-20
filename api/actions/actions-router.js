// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const mw = require("./actions-middleware");
const { json } = require("express");

router.get("/", async (req, res, next) => {
  try {
    const allActions = await actionsModel.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateActionId, (req, res, next) => {
  try {
    res.json(req.currentAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {});
router.put("/:id", mw.validateActionId, (req, res, next) => {});
router.delete("/:id", mw.validateActionId, (req, res, next) => {});

module.exports = router;
