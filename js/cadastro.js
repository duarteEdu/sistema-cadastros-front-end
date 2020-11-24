var form = document.getElementById("cadastra");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(form);
});

    // Realiza o Envio de dados
    // Realiza a validação dos campos antes de continuar
    // Adiciona uma classe de loading no botão do form

form.addEventListener('formdata', (e) => {
    var data = e.formData;

    if (e.formData.get('nome').length < 3){

        var p = document.createElement("p");
        p.innerText = "Erro: Deve conter mais que 3 caracteres.";
        p.className = "errorP";
        document.getElementById("nome").classList.add("errorInput");
        document.getElementById("nome").after(p);
        return false;
    }
    
    if (e.formData.get('cpf').length == 0){

        var p = document.createElement("p");
        p.innerText = "Erro: CPF inválido.";
        p.className = "errorP";
        document.getElementById("cpf").classList.add("errorInput");
        document.getElementById("cpf").after(p);
        return false;
    }

    if (e.formData.get('telefone').length == 11){

        var p = document.createElement("p");
        p.innerText = "Erro: Telefone inválido.";
        p.className = "errorP";
        document.getElementById("telefone").classList.add("errorInput");
        document.getElementById("telefone").after(p);
        return false;
    }

    if (e.formData.get('email').length < 3){

        var p = document.createElement("p");
        p.innerText = "Erro: Email Inválido.";
        p.className = "errorP";
        document.getElementById("email").classList.add("errorInput");
        document.getElementById("email").after(p);
        return false;
    }

    document.getElementById("botao").classList.add("sending");

    var localStorageObject = {
        name: e.formData.get('nome'),
        cpf: e.formData.get('cpf'),
        phone: e.formData.get('telefone'),
        email: e.formData.get('email')
    };

    var localStorageArray = [
        localStorageObject
    ];

    var currentLocalStorage = retrieveLocalStorage();
    if (currentLocalStorage != null) {
        currentLocalStorage.push(localStorageObject);
        saveInLocalStorage(currentLocalStorage);
    } else {
        saveInLocalStorage(localStorageArray);
    }

    setTimeout (function(){location.reload();}, 2000);
});

// Validação de só um dado :(

// var btn = document.getElementById("botao");
// var inputNome = document.getElementById("nome");
// var inputCpf = document.getElementById("cpf");

// inputNome.addEventListener("input", function (e){
//     if (inputNome["nome"] === "") {
//         btn.disabled = true;
//     } else{        
//         btn.disabled = false;
//         btn.classList.add("divButton");
//     }
// });


// Funções

function saveInLocalStorage(object) {
    localStorage.setItem('users', JSON.stringify(object));
}

function retrieveLocalStorage() {
    return obj = JSON.parse(localStorage.getItem('users'));
}


// Pegando dados da url

function getFromUrl() {

    let url = 'https://private-21e8de-rafaellucio.apiary-mock.com/users';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var currentLocalStorage = retrieveLocalStorage();
            if (currentLocalStorage.length == 0) {
                saveInLocalStorage(out);
            }
        })
        .catch(err => { throw err });
}
getFromUrl();
