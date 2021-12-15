const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activities = require('./activity.model.js')(sequelize, Sequelize);
db.todos = require('./todo.model.js')(sequelize, Sequelize);

db.todos.belongsTo(db.activities, {
    as: "activity_group",
    foreignKey: 'activity_group_id'
});

module.exports = db;