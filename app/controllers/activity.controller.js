const db = require('../models');
const ActivityModel = db.activities;


const validateActivity = (request) => {
    let errors = [];
    if (!request.title) {
        errors.push("title cannot be null");
    }

    if (!request.email) {
        errors.push("email cannot be null");
    }
    return errors;
}

exports.create = async (req, res) => {
    let valiMessage = validateActivity(req.body);

    if (valiMessage.length > 0) {
        res.status(400).send({
            status: "Bad Request",
            message: valiMessage,
            data: {}
        })
        return;
    };
    const requestActivity = {
        title: req.body.title,
        email: req.body.email
    };
    try {
        let resSave = await ActivityModel.create(requestActivity);
        res.status(201).send({
            status: "Success",
            message: "Success",
            data: resSave
        });
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Activity",
        })
    }
    return;
}
exports.findAll = async (req, res) => {
    try {
        let data = await ActivityModel.findAll({

            order: [
                ['created_at', 'DESC']
            ]

        });
        res.status(200).send({
            status: "Success",
            message: "Success",
            data
        });
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Activity",
        })
        return;
    }
}

exports.findOne = async (req, res) => {
    let idActivity = req.params.id;
    try {
        let data = await ActivityModel.findByPk(idActivity);
        if (data) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Activity with ID " + idActivity + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Activity",
        })
        return
    }
}


exports.delete = async (req, res) => {
    let idActivity = req.params.id;
    try {
        let resDelete = await ActivityModel.destroy({
            where: {
                id: idActivity
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
                message: "Activity with ID " + idActivity + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Activity",
        })
        return
    }
}
exports.update = async (req, res) => {
    let idActivity = req.params.id;
    let valiMessage = validateActivity(req.body);

    if (valiMessage.length > 0) {
        res.status(400).send({
            status: "Bad Request",
            message: valiMessage,
            data: {}
        })
        return;
    };
    try {
        let data = await ActivityModel.update(req.body, {
            where: {
                id: idActivity
            }
        });
        if (data == 1) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: {}
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Activity with ID " + idActivity + " Not found",
                data: {}
            });
        }
        return
    } catch (error) {
        res.status(500).send({
            status: "Server Error",
            message: error.message || "Some error occurred while creating the Activity",
        })
        return
    }
}