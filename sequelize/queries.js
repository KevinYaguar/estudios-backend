const sequelize = require('./index.js')

function obetenerTodasLasBandas() {

    sequelize.query("SELECT * FROM bandas", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerTodasLasBandas();

function obetenerBandasArgentinas() {

    sequelize.query("SELECT * FROM bandas WHERE pais = :pais", 
           { replacements: {pais:'Argetina'}, type: sequelize.QueryTypes.SELECT}
           ).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerBandasArgentinas()

function obetenerBandaSolista() {

    sequelize.query("SELECT * FROM bandas WHERE integrantes = :integrantes", 
           { replacements: {integrantes:1}, type: sequelize.QueryTypes.SELECT}
           ).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerBandaSolista();

function obetenerCancionesPostFecha(fecha) {

    sequelize.query("SELECT * FROM canciones WHERE fecha_publicacion > :fecha_publicacion", 
           { replacements: {fecha_publicacion: fecha}, type: sequelize.QueryTypes.SELECT}
           ).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerCancionesPostFecha("1985-01-01");

function obetenerCancionesPorDuracion(duracion) {

    sequelize.query("SELECT * FROM canciones WHERE duracion > :duracion", 
           { replacements: {duracion: duracion}, type: sequelize.QueryTypes.SELECT}
           ).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
//obetenerCancionesPorDuracion("3");

function obetenerTodosLosAlmbumes() {

    sequelize.query("SELECT * FROM albumes", 
           { type: sequelize.QueryTypes.SELECT}
           ).then(proyects => console.log(proyects))
        .catch(err => console.log(err))

}
obetenerTodosLosAlmbumes();