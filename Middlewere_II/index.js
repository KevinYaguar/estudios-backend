const express = require('express');
require('dotenv').config();
const compression = require('compression');

var app = express();
app.use(compression());
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => {
    console.log('El servidor corre en el puerto 3000');
})

let contactos = [{
        id: 1,
        nombre: 'Pepe',
        email: 'pepe@nada.com'
    },
    {
        id: 2,
        nombre: 'Hugo',
        email: 'hugo@nada.com'
    },
    {
        id: 3,
        nombre: 'Juan',
        email: 'juan@nada.com'
    }
];
app.use((req, res, next)=>{
    const {method, path, body, query} = req;
    console.log(`Path: ${path} - Method: ${method} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`);
    next();
})

const buscarPorId = (id)=>{
    return contactos.find(conctacto => conctacto.id === Number(id))
}
const buscarPorNombre = (nombre)=>{
    return contactos.find(conctacto => conctacto.nombre === nombre);
}

const validarTiposDeDatos = (req, res, next)=>{
    let {id, nombre} = req.query;
    let status = 400;
    if(!id && !nombre){
        respuesta = {
            error: 'parametro no definido'
        }
        res.status(status).send(respuesta)
        status = status;
    }
    next()
}

app.get('/contactos', validarTiposDeDatos, (req, res) => {
    let {id, nombre} = req.query;
    let respuesta = {};
    let status = 200;
    if(id){
        respuesta = buscarPorId(id);
    }
    else if(nombre){
        respuesta = buscarPorNombre(nombre);
    } 
    
    if (!respuesta) {
        status = 404;
        respuesta = {
            error: 'Contacto no encontrado'
        }
    }
    res.status(status).send(respuesta);
});


app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    console.log(JSON.stringify(err));
    return res.status(500)
        .json({
            error: '500',
            mensaje: 'Ha ocurrido un problema'
        })
})