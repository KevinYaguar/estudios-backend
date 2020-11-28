let calculadora = require('./funciones.js');

let suma = '7 + 4 = '+ calculadora.suma(7,4) + '...........';
let resta = '10 - 4 = ' + calculadora.resta(10,4) + '...........' ;
let multiplicacion = '4 x 3 =  '+ calculadora.multiplicacion(4,3) + '...........';
let division = '15 / 3 = ' + calculadora.division(15,3) + '...........';


var fs = require('fs');

fs.appendFile('log.txt', suma, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.appendFile('log.txt', resta, function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.appendFile('log.txt', multiplicacion, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.appendFile('log.txt', division, function (err) {
    if (err) throw err;
    console.log('Saved!');
});