const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Class = require('./class');

class Topic extends Model {}

Topic.init({
    className: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Class,
            key: 'className'
        },
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'topics',
    freezeTableName: true,
    timestamps: true,
});

module.exports = Topic;
