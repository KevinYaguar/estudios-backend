const Sequelize = require('sequelize');
const mysql = require('mysql2');
const path = 'mysql://root@localhost:3306/test';
const sequelize = new Sequelize(path, {operatorsAliases: false});
module.exports = sequelize;

