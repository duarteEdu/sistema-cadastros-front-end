var tabela = document.getElementById("tabela");

// preenche a lista

var listagemLocalStorage = retrieveLocalStorage();

for (let i = 0; i < listagemLocalStorage.length; i++) {
    var element = listagemLocalStorage[i];
    var tr = document.createElement("tr");

    for (const key in element) {
        if (element.hasOwnProperty(key)) {
            var td = document.createElement("td");
            const obj = element[key];
            td.innerText = obj;
            tr.appendChild(td);
        }
    }
    var actionTD = document.createElement("td");
    var actionbutton = document.createElement("a");
    actionbutton.innerHTML = "Remover";
    actionbutton.href = "#";
    actionbutton.id = i;
    actionbutton.className = "remover";
    actionbutton.onclick = clickHandler;
    actionTD.appendChild(actionbutton);

    tr.appendChild(actionTD);

    tabela.appendChild(tr);
}

// Funções

function clickHandler(e) {
    var item = e.target;

    var currentLocalStorage = retrieveLocalStorage();

    var id = item.id;
    var updatedLocalStorage = currentLocalStorage.splice(id, 1);
    saveInLocalStorage(currentLocalStorage);
    location.reload();
}

function retrieveLocalStorage() {
    return obj = JSON.parse(localStorage.getItem('users'));
}

function saveInLocalStorage(object) {
    localStorage.setItem('users', JSON.stringify(object));
}