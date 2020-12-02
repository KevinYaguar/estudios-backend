const express = require('express');
const jwt = require('jsonwebtoken');
const informacion = {nombre: 'Kevin', pais: 'Ecuador', marcador: '6-1'};
const firma = '$acAm1c4.901259_';
const token = jwt.sign(informacion, firma);

console.log(token)

const decondificar = jwt.verify(token, firma);

console.log(decondificar)

