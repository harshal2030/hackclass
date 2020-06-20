const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

class Class extends Model {}

Class.init({
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'username',
        },
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 1,
        },
        unique: true,
    },
    members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
}, {
    sequelize,
    modelName: 'classes',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (user, options) => {
            user.members = [user.owner]
        }
    }
})

module.exports = Class;
