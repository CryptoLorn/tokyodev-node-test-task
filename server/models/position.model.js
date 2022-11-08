const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Position = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING, allowNull: false},
    level: {type: DataTypes.STRING, allowNull: false},
    company: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
    japaneseRequired: {type: DataTypes.BOOLEAN, allowNull: false}
})

module.exports = {Position};