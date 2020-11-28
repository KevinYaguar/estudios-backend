var express = require('express');
var compression = require('compression');
require('dotenv').config();

var app = express();
app.use(express.json());
app.use(compression());


let escritores = [{
        id: 1,
        nombre: 'Jorge Luis',
        apellido: 'Borges',
        fechaDeNacimiento: '24/08/1899',
        libros: [{
                id: 1,
                titulo: 'Ficciones',
                descripcion: 'Se trata de uno mas sus mas...',
                anioPublicacion: 1944
            },
            {
                id: 2,
                titulo: 'El Aleph',
                descripcion: 'Ptra recopilacion de sus...',
                anioPublicacion: 1949
            }
        ]
    },
    {
        id: 2,
        nombre: 'Paul B',
        apellido: 'Preciado',
        fechaDeNacimiento: '11/11/1970',
        libros: [{
                id: 1,
                titulo: 'Manifiesto contrasexual',
                descripcion: 'Se trata de uno mas sus mas...',
                anioPublicacion: 2002
            },
            {
                id: 2,
                titulo: 'Testo yonqui',
                descripcion: 'Otra recopilacion de sus...',
                anioPublicacion: 2008
            }
        ]
    }
]

let validarSiExiteAutor = (req, res, next) => {
    const {
        nombre,
        apellido
    } = req.body;
    const i = escritores.findIndex(c => c.nombre === nombre);
    const j = escritores.findIndex(x => x.apellido === apellido);

    if (i >= 0 && j >= 0) {
        return res.status(409).send({
            status: 'error',
            mensaje: 'El autor ya existe'
        })
    }
    return next();
}
const buscarPorId = (id) => {
    return escritores.find(escritor => escritor.id === Number(id))
}
const solicitarId = (req, res, next)=>{
    let {id} = req.query;
    if(!id){
        status = 400;
        respuesta = {
            status: status,
            mensaje: 'Debe pasar un Id para realizar la accion que solicita'
        }
        return res.status(status).send(respuesta)
    } else if(id){
        return next();
    }
}
const validarId = (req, res, next) =>{
    let {id} = req.query;
    autorConsultado = buscarPorId(id);
     if(!autorConsultado){
        status = 400;
        respuesta = {
            status: status,
            mensaje: 'Id ingresado inválido'
        }
        return res.status(status).send(respuesta);
    }
    return next();
}


app.get('/autores', (req, res) => {
    let status = 200;
    let respuesta = {};
    let {id, libro} = req.query;
    //console.log(libro)
    if (id) {
        if(libro){
            autor = buscarPorId(id);
            respuesta = autor.libros[(libro-1)]
        } else if(!libro){
            respuesta = buscarPorId(id)
        }
        
    } else {
        respuesta = {
            escritores
        }
    }
    if (!respuesta) {
        status = 404
        respuesta = {
            status: status,
            mensaje: 'Error. Autor o libro no encontrado'
        }
    }
    res.status(status).send(respuesta);
})

app.post('/autores', validarSiExiteAutor, (req, res) => {
    let status = 200;
    escritores.push(req.body);
    respuesta = {
        status: status,
        mensaje: 'Escritor/a agregado/a'
    }
    res.status(status).send(respuesta);
})


app.delete('/autores', solicitarId, validarId, (req, res) => {
    let status = 200;
    let {id, libro} = req.query;
        if(libro){
            autor = buscarPorId(id);          
             autor.libros.splice((libro - 1), 1);        
            respuesta = {
            status: status,
            mensaje: 'Libro eliminado',
            }
        }else if(!libro){
            escritores.splice((id - 1), 1)
            respuesta = {
            status: status,
            mensaje: 'Autor/a eliminado/a',
            }
        }
        
        
    res.status(status).send(respuesta);
})



app.put('/autores', solicitarId, validarId, (req, res) => {
    status = 200;
    let {
        id
    } = req.query;       
            escritores.splice((id - 1), 1, req.body);
            respuesta = {
                status: status,
                mensaje: 'Autor/a modificado/a',
                modificacion: req.body
            }
    res.status(status).send(respuesta);
})

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    console.log(JSON.stringify(err));
    return res.status(500).send({
        error: 'Ha ocurrido un problema en el servidor'
    });

})

app.listen(process.env.SERV_PORT, () => {
    console.log('El servidor corre en el puerto 3000');
})