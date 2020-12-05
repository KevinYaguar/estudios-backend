let buscarTodo = document.getElementById('buscar-bandas')
let resultadosBanda = document.getElementById('resultados-banda')

function eliminarHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}
buscarTodo.addEventListener('click', () => {
    eliminarHijos(resultadosBanda)
    fetch('http://localhost:5000/bandas').then(res => res.json()).then(data => {
        //console.log(data)
        for (i = 0; i <= data.length - 1; i++) {
            let banda = document.createElement('div');
            banda.style.border = '1px solid black';
            resultadosBanda.appendChild(banda);

            let nombre = document.createElement('span');
            nombre.innerText = `Nombre: ${data[i].nombre}\n`;

            let integrantes = document.createElement('span');
            integrantes.innerText = `integrantes: ${data[i].integrantes}\n`;
            let fechaInicio = document.createElement('span');
            fechaInicio.innerText = `fecha de inicio: ${data[i].fecha_inicio}\n`;
            let fechaSeparacion = document.createElement('span');
            fechaSeparacion.innerText = `fechaSd separacion: ${data[i].fecha_separacion}\n`;
            let pais = document.createElement('span');
            pais.innerText = `Pais: ${data[i].pais}\n`;
            banda.appendChild(nombre);
            banda.appendChild(integrantes);
            banda.appendChild(fechaInicio);
            banda.appendChild(fechaSeparacion);
            banda.appendChild(pais);
        }
    });
})

let botonListo = document.getElementById('listo');

botonListo.addEventListener('click', () => {
    eliminarHijos(resultadosBanda);
})

///busqueda por nombre

let bandaPrefeInput = document.getElementById('banda-preferida');
let buscarPreferida = document.getElementById('resultados-banda-preferida');
let resultadosPreferida = document.getElementById('resultados-preferida');
let listoPrefe = document.getElementById('listo-prefe');
let banda = document.createElement('div');

listoPrefe.addEventListener('click', ()=>{
    eliminarHijos(resultadosPreferida);
})

buscarPreferida.addEventListener('click', () => {
    eliminarHijos(resultadosPreferida);

    fetch('http://localhost:5000/bandas/nombres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: bandaPrefeInput.value
        })
    }).then(data => data.json())
        .then(res => {
            
            banda.style.border = '1px solid black';
            resultadosPreferida.appendChild(banda)


            let bandaPrefeNombre = document.createElement('span');
            let bandaPrefeIntegrantes = document.createElement('span');
            let bandaPrefeFechaInicio = document.createElement('span');
            let bandaPrefeFechaFin = document.createElement('span');
            let bandaPrefePais = document.createElement('span');

            bandaPrefeNombre.innerText = `Nombre: ${res[0].nombre}\n`;
            bandaPrefeIntegrantes.innerText = `Integrantes: ${res[0].integrantes}\n`;
            bandaPrefeFechaInicio.innerText = `Fecha de Inicio: ${res[0].fecha_inicio}\n`;
            bandaPrefeFechaFin.innerText = `Fecha de Separacion: ${res[0].fecha_separacion}\n`;
            bandaPrefePais.innerText = `Pais: ${res[0].pais}\n`;
            
            banda.appendChild(bandaPrefeNombre);
            banda.appendChild(bandaPrefeIntegrantes);
            banda.appendChild(bandaPrefeFechaInicio);
            banda.appendChild(bandaPrefeFechaFin);
            banda.appendChild(bandaPrefePais);

            }).catch(err => {
                banda.style.border = '0px solid black';
                alert('Lo sentimos, no tenemos esa banda en nuestra base de datos. Puedes agregarla! Llena los campos y presiona el boton "Agregar banda"')
            })
})


let botonAgregar = document.getElementById('agregar-banda');


botonAgregar.addEventListener('click', ()=>{
    let nuevaBanda = document.getElementById('nueva-banda');
    let nuevaBandaIntegrantes = document.getElementById('nueva-banda-integrantes');
    let nuevaBandaFechaInicio = document.getElementById('nueva-banda-fecha-de-inicio');
    let nuevaBandaFechaFinal = document.getElementById('nueva-banda-fecha-de-separacion');
    let nuevaBandaPais = document.getElementById('nueva-banda-pais');

    fetch("http://localhost:5000/bandas", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
        JSON.stringify({
                id: 'NULL',
                nombre: nuevaBanda.value,
                integrantes: nuevaBandaIntegrantes.value,
                fecha_inicio: nuevaBandaFechaInicio.value,
                fecha_separacion: nuevaBandaFechaFinal.value,
                pais: nuevaBandaPais.value
            })
    }).then(res=>res.json()).then(data=> alert(`${data.mensaje}. Verificalo en el boton "Ver todas las bandas"`));
})

////Eliminar banda

let botonEliminar = document.getElementById('eliminar-banda');
let eliminarInput = document.getElementById('eliminar-input')

botonEliminar.addEventListener('click', ()=>{

    fetch("http://localhost:5000/bandas", {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nombre: eliminarInput.value})
    }).then(res=>res.json())
        .then(data=> alert('Banda eliminada exitosamente'))
            .catch(err=> console.log(err));
});

// UPDATE
let modificacionBandaInputNombre = document.getElementById('modificacion-nombre');
let modificacionBandaInputCampo = document.getElementById('modificacion-campo-input');
let modificacionBandaInputValor = document.getElementById('modificacion-valor-input');
let boton = document.getElementById('lalala');

boton.addEventListener('click', ()=>{

    fetch("http://localhost:5000/bandas", {
        method: "PUT",
        headers:
        {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            nombre: modificacionBandaInputNombre.value,
            campo: modificacionBandaInputCampo.value,
            modificacion: modificacionBandaInputValor.value
        })
    }).then(res=> res.json()).then(data =>{
        alert('Modificación realizada con exito, busca tu banda en la seccion de búsqueda.')
    }).catch(err => console.log(err))

})
