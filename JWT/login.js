let buttonSingIn = document.getElementById('login');

buttonSingIn.addEventListener('click', () => {
    let inputMail = document.getElementById('email');
    let inputPass = document.getElementById('password');
    let bodyAEnviar = {
        mail: inputMail.value,
        clave: inputPass.value
    }
    let fetchParams = {
        method: 'POST',
        body: JSON.stringify(bodyAEnviar),
        headers: {
            'Content-type': 'application/json',
        }
    }
    console.log(JSON.stringify(bodyAEnviar))
    fetch('http://localhost:5000/login', fetchParams).then(res => res.json())
        .then(json => {
            if (json.token) {
                console.log(json);
                console.log(json.decodificado.usuario);
                localStorage.setItem('token', json.token)
                localStorage.setItem('usuario', json.decodificado.usuario)


                let a = document.createElement('a');
                a.href = 'welcome.html';
                a.click()
            } else {
                console.log('Usuario o clave incorrectos')
            }
        });

})