module.exports = app => {
    const activity = require('../controllers/activity.controller.js');

    let router = require('express').Router();

    router.post("/", activity.create);
    router.get("/", activity.findAll);
    router.get("/:id", activity.findOne);
    router.delete("/:id", activity.delete);
    router.patch("/:id", activity.update);

    app.use("/activity-groups", router);
}