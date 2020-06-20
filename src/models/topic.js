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
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    attachements: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    }
}, {
    sequelize,
    modelName: 'topics',
    freezeTableName: true,
    timestamps: true,
});

module.exports = Topic;
