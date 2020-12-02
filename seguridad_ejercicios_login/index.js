let buttonSingIn = document.getElementById('login');

buttonSingIn.addEventListener('click', ()=>{
    let inputUsuario = document.getElementById('email');
    let inputPass = document.getElementById('password');
    let bodyAEnviar = {usuario: inputUsuario.value, clave: inputPass.value}
    let fetchParams = {
        method: 'POST', 
        body: JSON.stringify(bodyAEnviar),
        headers: {
            'Content-type':'application/json',
        }
    }
    console.log(JSON.stringify(bodyAEnviar))
    fetch('http://localhost:5000/login', fetchParams).then(res => res.json())
    .then(json =>{
        console.log(json.token);
        localStorage.setItem('token', json.token)
    });

})