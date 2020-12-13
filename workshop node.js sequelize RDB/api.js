const express = require('express');
const sequelize = require('./db_conexion');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const log = (req, res, next) => {
  const { method, path, query, body } = req;
  console.log(`Method: ${method} - Path: ${path} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`);
  return next();
};

app.use(log);

let arrUsuarios = [];
const validarEmailExistente = (req, res, next) => {
  const existe = arrUsuarios.find(e => e.email === req.body.email);
  if (existe) {
    return res.status(404).json({ error: 'El email ya existe' });
  }
  return next();
}
const validarGmailHotmailYahoo = (req, res, next) => {
  const email = req.body.email;

  if (email.includes('@gmail.com') || email.includes('@hotmail.com') || email.includes('@yahoo.com')) {
    return res.status(400).json({ error: 'Email no es válido' });
  }
  return next();
}

async function insertarUsuario (usuario) {
  
  let arrUsuario = Object.values(usuario);
  console.log(arrUsuario);
  let resultado = await sequelize.query('INSERT INTO personas (id, nombre, apellido, mail) VALUES ("NULL", ?)', {replacements: [arrUsuario]}) 
  return resultado;
}

app.get('/usuarios', (req, res) => {
  res.status(200).json(arrUsuarios);
});


app.post('/registrar', validarGmailHotmailYahoo, validarEmailExistente, (req, res) => {

  insertarUsuario(req.body).then(proyects => res.status(200).send({status:'ok', mensaje:'Usuario agregado'})).catch(err=>console.error(err));

});

app.get('/login', function(req, res) {
  let status = 200;
  let { user, pass } = req.body;
  let respuesta = '';
  if (!user && !pass) {
    status = 400;
    respuesta = {
      error: true,
      status: 400,
      mensaje: 'No autorizado. Peticion mal formada'
    }
  } else if (user === 'admin' && pass === '1234') {
    status = 200;
    respuesta = {
      error: false,
      status: 200,
      mensaje: 'Login exitoso'
    }
  } else {
    status = 401;
    respuesta = {
      error: true,
      status: 401,
      mensaje: 'No autorizado'
    }
  }

  res.status(status).send(respuesta);

})

app.listen(3000, () => {
  console.log('Servidor en ejecución...');
});