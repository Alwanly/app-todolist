const db = require('../models');
const TodoModel = db.todos;


const validateTodo = (request) => {
    let errors = [];
    if (!request.activity_group_id) errors.push("activity_group_id cannot be null");
    if (!request.title) errors.push("title cannot be null");
    return errors
}


exports.create = async (req, res) => {
    let valiMessage = validateTodo(req.body);
    if (valiMessage.length > 0) {
        res.status(400).send({
            status: "Bad Request",
            message: valiMessage,
            data: {}
        })
        return
    }
    try {
        let resSave = await TodoModel.create(req.body);
        res.status(201).send({
            status: "Success",
            message: "Success",
            data: resSave
        })
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Todo",
        })
    }
    return
}

exports.findAll = async (req, res) => {
    let activityGroupId = req.query.activity_group_id;
    try {
        if (activityGroupId) {
            var where = {
                activity_group_id: activityGroupId
            }
        }
        let resData = await TodoModel.scope('notDeleted').findAll({
            where: where,
            order: [
                ['created_at', 'DESC']
            ]
        });
        res.status(200).send({
            status: "Success",
            message: "Success",
            data: resData
        });
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Todo",
        })
    }
    return;
}

exports.findOne = async (req, res) => {
    let idTodo = req.params.id;
    try {
        let data = await TodoModel.scope("notDeleted").findByPk(idTodo);
        if (data) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Todo with ID " + idTodo + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Todo",
        })
        return
    }
}

exports.update = async (req, res) => {
    let idTodo = req.params.id;
    try {
        let data = await TodoModel.update(req.body, {
            where: {
                id: idTodo
            }
        })
        if (data == 1) {
            let data = await TodoModel.scope('notDeleted').findByPk(idTodo);
            res.status(200).send({
                status: "Success",
                message: "Success",
                data
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Todo with ID " + idTodo + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Todo",
        })
        return
    }
}

exports.delete = async (req, res) => {
    let idTodo = req.params.id;
    try {
        let resDelete = await TodoModel.destroy({
            where: {
                id: idTodo
            }
        });
        if (resDelete == 1) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: {}
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Todo with ID " + idTodo + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Todo",
        })
        return
    }
}