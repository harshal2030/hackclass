const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.uri);

module.exports = sequelize;
