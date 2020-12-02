const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors')
const jwtClave = 'Ac4m1c4_E$tUd14nT3s';

const app = express();

app.use(express.json());
app.use(cors());

//Protegemos todo menos el /login. Monte un middleware global que verifique los tokens en todas las rutas menos en el /login
//app.use(expressJwt({ secret: jwtClave, algorithms: ['sha1', 'RS256', 'HS256'] }).unless({ path: ["/singin"] }));

retornarUsuarioNoAtorizado = (res) => {
    res.status(401).send({error: 'Usuario no autorizado'})
}

////"base de datos"
var usuario = {

    nombre: "Kevin",
    apellido: 'Yaguar',
    mail: 'kevin@yaguar.com',
    edad: 25,
    clave: "pupito"
}
var usuarios = [
    {

        nombre: "Kevin",
        apellido: 'Yaguar',
        mail: 'kevin@yaguar.com',
        edad: '25',
        clave: "pupito"
    },
    {

        nombre: "Gustavo",
        apellido: 'Segovia',
        mail: 'gustavo@segovia.com',
        edad: 28,
        clave: "michi"
    }
]


var noticia = {
    id: 1,
    noticia: 'choque'
}

verificarToken = (req, res, next) =>{
    let token = req.headers.authorization;
    console.log(token)
    if(token){
        token = token.split(' ')[1]; //Como  la cadena tiene la palabra "bearer" al princiío, se hace el split para separar la cadena en dos partes y quedarse con la segunda ( [1] )
        let decodificado = jwt.verify(token, jwtClave);
        console.log(decodificado);
        if(!decodificado){
            retornarUsuarioNoAtorizado(res);
        }
        next();
    } else{
        retornarUsuarioNoAtorizado(res);
    }
} 

//Metodo protegido con jwt
app.get('/noticias', (req, res)=>{
    res.status(200).send(noticia);
})

app.post('/login', (req, res)=>{
    //console.log(req.body);
    //console.log(req.body.clave);
    let user = usuarios.find(usuario => usuario.mail == req.body.mail)
    if(req.body.mail == user.mail && req.body.clave == user.clave){
        //creacion del token para pasar
        let token = jwt.sign({usuario: user.nombre}, jwtClave)
        let decodificado = jwt.verify(token, jwtClave)
        //envio token
        res.status(200).send({
            token: token,
            decodificado: decodificado
        })
    } else {
        res.status(401).send({error:'usuario o contraseña incorrectos'})
    }
})

app.post('/singin', (req, res)=>{
    let {nombre, apellido, mail, edad, clave} = req.body;
    let user = usuarios.find(user => user.mail == req.body.mail);
    if(!user){
        usuarios.push(req.body);
        res.status(200).send({status: 200, mensaje:'Usuario registrado con éxito'});
    } else {
        res.status(401).send({status:'401', mensaje:'El mail ingresado ya esta en uso'});
    }
    
})

app.get('/usuarios', (req, res)=>{
    respuesta = {
        usuarios
    }
    res.status(200).send(respuesta)
})

app.listen(5000, function(){
    console.log('Servidor corriendo en el puerto 5000...')
})

app.use((err, req, res, next) =>{
    if(err){
        res.status(500).send(err)
    } else{
        next();
    }
})