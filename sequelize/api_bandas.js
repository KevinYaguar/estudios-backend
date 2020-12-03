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

app.get('/bandas/nombres', (req, res)=>{
        
         // recibe [ "nombre"]
         sequelize.query(`SELECT * FROM bandas WHERE nombre = ?`, {
            replacements: [req.body],
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>
            res.status(200).send(proyects)
        )
        .catch(err => console.log(err))
})

app.post('/bandas', (req, res) => {
    //recibe ["NULL", "The Beatles", 5, "1960-01-01", "1970-01-01", "Reino Unido"]
    sequelize.query('INSERT INTO bandas (id, nombre, integrantes, fecha_inicio, fecha_separacion,pais) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: req.body
        })
        .then(proyects => res.status(200).send({
            status: 'OK',
            mensaje: 'Banda Agregada con éxito'
        }))
        .catch(err => console.log(err))
})


app.delete('/bandas', (req, res) => {
    // Recibe ["Los Redondos"]
    sequelize.query('DELETE FROM bandas WHERE nombre = :nombre', {
            replacements: {
                nombre: req.body
            }
        })
        .then(proyects => res.status(200).send({
            status: 'OK',
            mensaje: 'Banda Eliminada con exito'
        }))
        .catch(err => console.log(err))
})

app.put('/bandas', (req, res) => {
    //recibe [campo, modificacion, nombreDeLaBanda]
    function actualizar(campo) {
        sequelize.query(`UPDATE bandas SET ${campo} = ? WHERE nombre = ?`, {
            replacements: [req.body[1], req.body[2]]
        }).then(proyects =>
            res.status(200).send({
                status: 'OK',
                mensaje: 'Modificacion realizada'
            })
        ).catch(err => console.log(err));
    }
    actualizar(req.body[0])

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