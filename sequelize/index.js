const Sequelize = require('sequelize');
const mysql = require('mysql2');
const path = 'mysql://root@localhost:3306/test';
const sequelize = new Sequelize(path, {operatorsAliases: false});



function obetenerEspecificosRegistros() {

    sequelize.query("SELECT nombre FROM bandas", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerEspecificosRegistros();
module.exports = sequelize;

