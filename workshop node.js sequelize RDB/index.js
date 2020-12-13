const apiRegsitrar = async (p_body) => {
    try {
        let header= new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-Type', 'application/json');

        console.log(header.get('Content-Type'));
        const response = await fetch(`http://localhost:3000/registrar`, {
            method: 'POST', 
            
            headers:  header,
            body: JSON.stringify(p_body)
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

class RegistrarUsuarios {
    constructor(name, lastname, email) {
        this.name = name;
        this.lastname = lastname;
        this.email = email
    }
};

const Registrar = () => {
    let name, lastname, email;
    name = document.getElementById('name').value;
    lastname = document.getElementById('lastname').value;
    email = document.getElementById('email').value;
    let registrar = new RegistrarUsuarios(name, lastname, email);
    apiRegsitrar(registrar)
        .then(res => console.log(res))
        .catch(error => console.log(error));
};

let btn = document.getElementById('enviar');

btn.addEventListener('click', (e) => {
    Registrar();
});