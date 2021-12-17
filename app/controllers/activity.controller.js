const db = require('../models');
const ActivityModel = db.activities;


const validateActivity = (request) => {
    if (!request.title) {
        return "title cannot be null";
    }

    if (!request.email) {
        return "email cannot be null";
    }
    return "";
}

exports.create = async (req, res) => {
    let valiMessage = validateActivity(req.body);

    if (valiMessage) {
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
        let data = await ActivityModel.findAll();
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
                message: "Activity with ID " + idActivity + " Not Found",
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
                message: "Activity with ID " + idActivity + " Not Found",
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

    if (!req.body.title) {
        res.status(400).send({
            status: "Bad Request",
            message: "title cannot be null",
            data: {}
        })
        return;
    }
    try {
        let data = await ActivityModel.update(req.body, {
            where: {
                id: idActivity
            }
        });
        if (data == 1) {
            data = await ActivityModel.findByPk(idActivity);
            res.status(200).send({
                status: "Success",
                message: "Success",
                data
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message: "Activity with ID " + idActivity + " Not Found",
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