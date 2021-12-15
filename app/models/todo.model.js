module.exports = (sequelize, Sequelize) => {
    const Todos = sequelize.define("todos", {
        id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        activity_group_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priority: {
            type: Sequelize.ENUM('very-low', 'low', 'normal', 'high', 'very-high'),
            allowNull: false,
            defaultValue: 'very-high'
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        scopes: {
            notDeleted: {
                attributes: ['id', 'activity_group_id', 'title', 'priority', 'is_active', 'created_at', 'updated_at']
            }
        },
        sequelize,
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"

    });
    return Todos;
}