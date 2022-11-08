const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Applicant = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, trim: true, unique: true, allowNull: false},
    categories: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
    japaneseKnowledge: {type: DataTypes.BOOLEAN, allowNull: false},
    level: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {Applicant};