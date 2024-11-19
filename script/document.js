document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:8080/PDdocumentsRS/myPersonalDriver/documents/2')
    .then((response)=>{
        if(!response.ok){
            throw new Error(`Errore: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("dati presi");
        displayDocs(data);
    })
    .catch(error => {
        console.error(error);
    })
});

function displayDocs(doc){
    let docContainer = document.getElementById("docSection");
    docContainer.innerHTML = '';

    createContent(doc, docContainer);
}

function createContent(doc, docContainer){
    
    let divImg = document.createElement('div');
    let img = document.createElement('img');
    img.src = /* `./img/${doc.photo}` */`./img/patente.jpg`; 
    img.alt = 'foto documento';
    divImg.appendChild(img);

    let divInfo = document.createElement('div');
    divInfo.id = 'info';

    let user = document.createElement('p');
    user.textContent = `Utente: ${doc.user.firstname} ${doc.user.lastname}`;
    let docType = document.createElement('p');
    docType.textContent = `Tipo documento: ${doc.type}`;
    let docNum = document.createElement('p');
    docNum.textContent = `Numero documento: ${doc.number}`;
    let expiryDate = document.createElement('p');
    let formatDate = new Date(doc.expiryDate.replace("[UTC]", ""));
    expiryDate.textContent = `Data di scadenza: ${formatDate.toLocaleDateString()}`;

    divInfo.appendChild(user);
    divInfo.appendChild(docType);
    divInfo.appendChild(docNum);
    divInfo.appendChild(expiryDate);

    docContainer.appendChild(divImg);
    docContainer.appendChild(divInfo);
}


