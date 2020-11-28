/*const coolImages = require("cool-images");
const fs = require('fs');
const moment = require('moment')


let array = coolImages.many(300, 300, 10);
//console.log(array)


fs.appendFile('log.txt', moment().format() + array , function (err) {
    if (err) throw err;
    console.log('Saved!');
  });*/
/////////////// 
/*
var express = require('express');
var app = express();

app.get('/mi_ruta', function (req, res) {
    respuesta = {
      error : false,
      coddigo: 200,
      mensaje: 'punto de inicio'
    };
    res.status(200).send(respuesta);
});

app.listen(3000, function () {
    console.log('El servidor express corre en el puerto 3000');
});
*/ //////////////
/*
var express = require('express');
var app = express();
//const bodyParser = require('body-parser');
app.use(express.json());

let pais = {
  nombre: 'Argentina',
  habitantes: '40000000'
}

app.get('/pais', function (req, res) {
  let status = 200;
  respuesta = {
    error: false,
    codigo: status,
    mensaje: ''
  }
  if (pais.nombre === '' || pais.habitantes === '') {
    let status = 404;
    respuesta = {
      error: false,
      codigo: status,
      mensaje: 'el pais no fue creado'
    }
  } else{
    
    respuesta = {
      error: false,
      codigo: status,
      mensaje: 'respuesta del pais',
      respuesta: pais
    }
  }
  res.status(status).send(respuesta)
})

app.post('/pais', function(req, res){
  let status = 200;
  console.log(req.body.nombre);

  if(!req.body.nombre || !req.body.habitantes){
    status = 400;
    respuesta = {
      error: false,
      codigo: status,
      mensaje: 'El campo nombre y habitantes son requeridos'
    };
  } else{
    if(pais.nombre === req.body.nombre ){
      status = 503;
      respuesta = {
        error: false,
        codigo: status,
        mensaje: 'El pais ya fue creado'
      } 
    }else{
      //si el pais no existe, lo creamos y generamos respuesta.
      let pais = {
        nombre: req.body.nombre,
        habitantes: req.body.habitantes
      };
      respuesta = {
        error: false,
        codigo: status,
        mensaje: 'pais creado',
        respuesta: pais
      }
    }
  }
  res.status(status).send(respuesta);
})

app.listen(3000, function () {
  console.log('El servidor express corre en el puerto 3000');
});

//middlewere. Generamos la respuesta a las url no encontradas
app.use(function(req, res, next){
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: 'pagina no encontrada'
  }
})*/
///////////////////////////////////////////////////////////////////////////////////
/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());

app.get('/celular', function (req, res) {

  res.status(200).send(telefonos);
})

let telefonos = [];

app.post('/celular', function (req, res) {
  let status = 201; //creacion de nuevo post = 201
  let nuevoTelefono = req.body;
  //evitar duplicados 
  let encontrado = telefonos.find(telefono => telefono.marca === req.body.marca && telefono.modelo === req.body.modelo)
  if (encontrado) {
    status = 409; //conflicto
    nuevoTelefono = {
      error: 'el telfono ya existe'
    }
  } else {
    telefonos.push(nuevoTelefono);
  }

  res.status(status).send(nuevoTelefono);
})

app.put('/celular', function (req, res) {
  let encontrado = telefonos.find(telefono => telefono.marca === req.body.marca && telefono.modelo === req.body.modelo)
  let status = 200;
  if(encontrado){
    telefonos.pop(encontrado);
    telefonos.push(req.body);
    respuesta = {mensaje: 'telefono actualizado'}
  } else{
    status = 400;
    respuesta = {error: 'telefono no existe'}
  }
  res.status(status).send(respuesta);
})

app.delete('/celular', function (req, res) {
  let encontrado = telefonos.find(telefono => telefono.marca === req.body.marca && telefono.modelo === req.body.modelo)
  let status = 200;
  if(encontrado){
    
    telefonos.pop(encontrado);
    respuesta = {mensaje: 'telefono eliminado'}
  } else{
    status = 400;
    respuesta = {error: 'telefono no existe'}
  }
  res.status(status).send(respuesta);
})

app.get('/celular/barato', function (req, res){
  let status = 200;
  let encontrado = telefonos.filter(telefono => telefono.precio < 500)
  if(encontrado == ''){
    respuesta = {
      error: 'No hay telefonos menos a 500 pe'
    }
  }else{
     respuesta = {
      encontrado
     }
  }
  res.status(status).send(respuesta);
})

app.get('/celular', function (req, res){
  let status = 200;
  
  if(req.params.name == 0){
    telefonos.precio.sort()
    respuesta = {
      telefonos
    }
  } else
  if(req.params.name == 1){
    telefonos.reverse(precio)
     respuesta = {
      hola: 'telefonos'
     }
  } else{
    status = 400;
    respuesta = {
      error: 'El parametro tiene que ser 1 o 0'
    }
  }
  res.status(status).send(respuesta);
})

app.listen(5000, function () {
  console.log('El servidor express corre en el puerto 5000');
})
//middleweres
app.use(function (req, res, next) {
  console.log('middle')
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: 'Url no disponible'
  }
})
 let particular = function (req, res, next){
  console.log('particular');
  next();
 }
*/
/*
{
marca: valor,
modelo: valor,
pantalla: valor,
sistema_operativo: valor,
precio: valor
}
*/

/////////////////MIDDLEWARE
var express = require('express');
var app = express();

app.use(function(req, res, next){
        console.log('Middle');
        next();
})

let particular = function(req, res, next){
        console.log('Particular');
        next();
}

app.get('/mi_ruta', particular, function (req, res) {
    res.send('Mi ruta');
});

app.get('/otra_ruta', function (req, res) {
        res.send('Mi otra ruta');
});

app.listen('3000', function(){
    console.log('El servidor corre en el puerto 3000')
})