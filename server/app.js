require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const models = require('./models/applicant.model');
const router = require('./routes/index');
const {errorHandler} = require("./errors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();