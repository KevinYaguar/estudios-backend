let buscarTodo = document.getElementById('buscar-bandas')
let resultadosBanda = document.getElementById('resultados-banda')
function eliminarHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}
buscarTodo.addEventListener('click', ()=>{
    eliminarHijos(resultadosBanda)
    fetch('http://localhost:5000/bandas').then(res=>res.json()).then(data => {
        console.log(data)
        for(i=0; i<= data.length - 1; i++){
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
    }
    );
})
