const Sequelize = require('sequelize');
const mysql = require('mysql2');
const sequelize = new Sequelize('mysql://user:pass@host:port/bandas');



sequelize.query('SELECT * FROM bandas', 
{type: sequelize.QueryTypes.SELECT}
).then(function(proyects){
    console.log(proyects)
});

console.log(query);