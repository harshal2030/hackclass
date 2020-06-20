const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Request extends Model {};

Request.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'requests',
    freezeTableName: true,
    timestamps: true,
})

module.exports = Request;
