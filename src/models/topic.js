const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Class = require('./class');

class Topic extends Model {}

Topic.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Class,
            key: 'className'
        },
    },
    
}, {
    sequelize,
    modelName: 'topics',
    freezeTableName: true,
    timestamps: true,
})