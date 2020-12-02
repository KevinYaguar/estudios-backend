const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

let contactos = [
    { id:1, nombre: 'Juan'},
    { id:2, nombre: 'Pedro'},
    { id:3, nombre: 'Rafa'},
]
const limiter = rateLimit({
    windowsMs: 60*60*1000, // 1 hora
    max: 5, //Limita cada IP a 5 solicitudes por ventana
    message: 'Supero el tiempo máximo de conexiones por hora'
})
//app.use(limiter) //Lo agrego de manera global, Dentro del GET lo podría agregar de manera local como un middlewere

app.get('/test', limiter, (req, res)=>{
    res.status(200).send({response: contactos})

})

app.listen(process.env.SERVER_PORT, ()=>{
    console.log('Servidor corriendo en el puerto 3000')
})