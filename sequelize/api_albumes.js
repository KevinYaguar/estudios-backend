const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./index.js')

app.use(express.json());

app.get('/albumes', (req, res) => {
    sequelize.query("SELECT * FROM albumes", {
            type: sequelize.QueryTypes.SELECT
        }).then(proyects =>
            res.status(200).send(proyects)
        )
        .catch(err => console.log(err))
})

app.get('/albumes/nombres', (req, res)=>{
    let nombre = req.body.nombre;
    sequelize.query('SELECT * FROM albumes WHERE nombre_album = ?', {
        replacements: [nombre], type: sequelize.QueryTypes.SELECT
    }).then(proyects => res.status(200).send(proyects))
        .catch(err=>console.log(err))
})

app.post('/albumes', (req, res)=>{
    let {id, nombre_album, banda, fecha_publicacion} = req.body;
    sequelize.query('INSERT INTO albumes (id, nombre_album, banda, fecha_publicacion) VALUES (?, ?, ?, ?)', {
        replacements: [id, nombre_album, banda, fecha_publicacion]
    }).then(proyects=> 
        res.status(200).send({status: 'OK', mensaje: 'Album agregado existosamente'}))
        .catch(err=>console.log(err))
})

app.delete('/albumes', (req, res)=>{
    let {nombre_album} = req.body;
    sequelize.query('DELETE from albumes WHERE nombre_album = ?', {replacements: [nombre_album]})
    .then(proyects=> res.status(200).send({status:'OK', mensaje:'Album Eliminada Exitosamente'}))
        .catch(err=>console.log(err));
})

app.put('/albumes', (req, res)=>{
    let {nombre_album, campo, modificacion} = req.body;
    sequelize.query(`UPDATE albumes SET ${campo} = ? WHERE nombre_album = ?`, {
        replacements: [modificacion, nombre_album]
    }).then(proyects=> res.status(200).send({status:'OK', mensaje:'Modificacion realizada con exito', campo_modificado: campo,
    modificacion: modificacion
}))
})

app.listen(process.env.SERVER_PORT_ALBUMES, (req, res) => {
    console.log('Servidor corriendo en el puerto 6000...')
})

app.use((err, req, res, next) => {
    if (!err) {
        next();
    } else {
        console.log(JSON.stringify(err));
    }
})