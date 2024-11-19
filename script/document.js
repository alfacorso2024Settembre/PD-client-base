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
    let userSpan = document.createElement('span');
    userSpan.className = 'infoLabel';
    userSpan.textContent = 'Utente: ';
    user.appendChild(userSpan);
    user.appendChild(document.createTextNode(` ${doc.user.firstname} ${doc.user.lastname}`));

    let docType = document.createElement('p');
    let typeSpan = document.createElement('span');
    typeSpan.className = 'infoLabel';
    typeSpan.textContent = 'Tipo documento: ';
    docType.appendChild(typeSpan);
    docType.appendChild(document.createTextNode(`${doc.type}`));

    let docNum = document.createElement('p');
    let numSpan = document.createElement('span');
    numSpan.className = 'infoLabel';
    numSpan.textContent = 'Numero documento: ';
    docNum.appendChild(numSpan);
    docNum.appendChild(document.createTextNode(`${doc.number}`));

    let expiryDate = document.createElement('p');
    let dateSpan = document.createElement('span');
    dateSpan.className = 'infoLabel';
    dateSpan.textContent = 'Data di scadenza: ';
    expiryDate.appendChild(dateSpan);
    let formatDate = new Date(doc.expiryDate.replace("[UTC]", ""));
    expiryDate.appendChild(document.createTextNode(`${formatDate.toLocaleDateString()}`));

    divInfo.appendChild(user);
    divInfo.appendChild(docType);
    divInfo.appendChild(docNum);
    divInfo.appendChild(expiryDate);

    docContainer.appendChild(divImg);
    docContainer.appendChild(divInfo);
}


