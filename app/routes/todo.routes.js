module.exports = app => {
    const todo = require('../controllers/todo.controller.js');

    let router = require('express').Router();

    router.post("/", todo.create);
    router.get("/", todo.findAll);
    router.get("/:id", todo.findOne);
    router.delete("/:id", todo.delete);
    router.patch("/:id", todo.update);

    app.use("/todo-items", router);
}