const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./index.js')

app.use(express.json());

app.get('/canciones', (req, res) => {
    sequelize.query("SELECT * FROM canciones", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>
            res.status(200).send(proyects)
        )
        .catch(err => console.log(err))
})

app.get('/canciones/nombres', (req, res)=>{
    let {nombre}=req.body;
    sequelize.query('SELECT * FROM canciones WHERE nombre = ?', {replacements: [nombre],
        type: sequelize.QueryTypes.SELECT})
        .then(proyects=> res.status(200).send({proyects})).catch(err=>console.log(err));
})

app.post('/canciones', (req, res)=>{
    let {id, nombre, duracion, album,  banda, fecha_publicacion} = req.body;
    sequelize.query('INSERT INTO canciones (id, nombre, duracion, album, banda, fecha_publicacion) VALUES (?, ?, ?, ?, ?, ?)', {
        replacements: [id, nombre, duracion, album, banda, fecha_publicacion]
    }).then(proyects=> res.status(200).send({status:'OK',mensaje:'Cancion agregada exitosamente'})).catch(err=>console.log(err));
})


app.listen(process.env.SERVER_PORT_CANCIONES, (req, res) => {
    console.log('Servidor corriendo en el puerto 6500...')
})

app.use((err, req, res, next) => {
    if (!err) {
        next();
    } else {
        console.log(JSON.stringify(err));
    }
})