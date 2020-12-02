let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let mail = document.getElementById('email');
let age = document.getElementById('age');
let pass = document.getElementById('password');
let buttonSign = document.getElementById('SingIn');
let valido = document.getElementById('emailOK');


document.getElementById('email').addEventListener('input',
function () {
    campo = event.target;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
        valido.innerText = "válido";
    } else {
        valido.innerText = "incorrecto";
    }
});

function esEntero (numero){
    if(numero  % 1 !== 0){
         alert('Ingrese una numero entero en la edad')
    } 
}
age.addEventListener('focusout', ()=>{
    parseInt(age.value);
    esEntero(age.value);
}, false)



buttonSign.addEventListener('click', () => {
    
    if(valido.innerText === "incorrecto"){
        alert('Porfavor ingrese un mail válido')
    } else{
        let bodyAEnviar = {

            nombre: name.value,
            apellido: lastName.value,
            mail: mail.value,
            edad: age.value,
            clave: pass.value
        }
        let fetchParams = {
            method: 'POST',
            body: JSON.stringify(bodyAEnviar),
            headers: {
                'Content-type': 'application/json',
            }
        }
        //console.log(JSON.stringify(bodyAEnviar))
    
        fetch('http://localhost:5000/singin', fetchParams).then(res => res.json())
            .then(json => {
                console.log(json.mensaje);
                if (json.status == 200) {
                    alert('Usuario Registrado con exito')
                    let a = document.createElement('a');
                    a.href = 'login.html';
                    a.click();
                }
            })
    }

    
}, false)