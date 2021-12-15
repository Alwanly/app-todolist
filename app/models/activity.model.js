module.exports = (sequelize, Sequelize) => {
    const Activities = sequelize.define("activities", {
        id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
    return Activities;
}