const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.APP_PORT || 3030;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./app/models');

db.sequelize.sync({
        force: false
    })
    .then(() => console.log("Database Connected"))
    .catch(() => console.log("Database cannot Connect"));

app.get('/', (req, res) => res.send('Hello World!'))
require("./app/routes/activity.routes.js")(app)
require("./app/routes/todo.routes.js")(app)
app.listen(port, () => console.log(`App listening on port ${port}!`))