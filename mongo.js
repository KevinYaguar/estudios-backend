const mongoose = require('mongoose');
const { stringify } = require('querystring');
mongoose.connect('mongodb://localhost:27017/mi_base');


const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({name: 'mishino'});
kitty.save();

schema = {nombre: String, apellido: String, edad : Number};

const Usuarios = mongoose.model('Usuarios', schema);

const yo = {nombre: 'Juan', apellido: 'Perez', edad: 24};
let nuevo_usuario = new Usuarios(yo);
nuevo_usuario.save();

Usuarios.find().then(function (resultados){
    print(resultados);
    });