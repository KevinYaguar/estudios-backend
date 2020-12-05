const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./index.js')
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/bandas', (req, res) => {
        sequelize.query("SELECT * FROM bandas", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>
            res.status(200).send(proyects)
        )
        .catch(err => console.log(err))
})

app.post('/bandas/nombres', (req, res)=>{
        let nombre = req.body.nombre;
         // recibe {"nombre": "La Renga"}
         sequelize.query(`SELECT * FROM bandas WHERE nombre = ?`, {
            replacements: [nombre],
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>
            res.status(200).send(proyects)
        )
        .catch(err => console.log(err))
})
////subir banda

function verificarSiExiste (req, res, nombre, next){
    app.get('/bandas', (req, res) => {
        sequelize.query("SELECT * FROM bandas", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>{
            let banda = proyects.find(bandaYaExiste => bandaYaExiste.nombre == nombre)
            if(banda){
                return next();
            } else if(!banda){
                return res.status(400).send({mensaje: 'La banda ya existe en nuestra base de datos'})
            }
        }).catch(err => console.log(err))
})
}

app.post('/bandas', /*verificarSiExiste,*/ (req, res) => {
    let {id, nombre, integrantes, fecha_inicio, fecha_separacion, pais} = req.body;
    sequelize.query('INSERT INTO bandas (id, nombre, integrantes, fecha_inicio, fecha_separacion, pais) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [id, nombre, integrantes, fecha_inicio, fecha_separacion, pais]
        })
        .then(proyects => res.status(200).send({
            status: 'OK',
            mensaje: 'Banda Agregada con éxito'
        }))
        .catch(err => console.log(err))
})


app.delete('/bandas', (req, res) => {
    // Recibe    {"nombre": "La Renga"}
    let nombre = req.body.nombre;
    sequelize.query('DELETE FROM bandas WHERE nombre = ?', {
            replacements: [nombre]
        })
        .then(proyects => res.status(200).send({
            status: 'OK',
            mensaje: 'Banda Eliminada con exito'
        }))
        .catch(err => console.log(err))
})

app.put('/bandas', (req, res) => {
    //recibe {nombre: "banda", campo: "campo", modificacion = ""}
    let {nombre, campo, modificacion} = req.body;
    
        sequelize.query(`UPDATE bandas SET ${campo} = ? WHERE nombre = ?`, {
            replacements: [modificacion, nombre]
        }).then(proyects =>
            res.status(200).send({
                status: 'OK',
                mensaje: 'Modificacion realizada'
            })
        ).catch(err => console.log(err));
})

app.listen(process.env.SERVER_PORT, (req, res) => {
    console.log('Servidor corriendo en el puerto 5000...')
})

app.use((err, req, res, next) => {
    if (!err) {
        next();
    } else {
        console.log(JSON.stringify(err));
    }
})