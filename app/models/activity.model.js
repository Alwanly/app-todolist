module.exports = (sequelize, Sequelize) => {
    const Activities = sequelize.define("activities", {
        id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        scopes: {
            notDeleted: {
                attributes: ['id', 'title', 'email', 'created_at', 'updated_at']
            }
        },
        sequelize,
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    });
    return Activities;
}