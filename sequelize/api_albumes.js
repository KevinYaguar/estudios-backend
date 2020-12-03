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