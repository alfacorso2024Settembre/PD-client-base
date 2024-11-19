document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:8080/PDdocumentsRS/myPersonalDriver/documents/isAccepted?text=davalidare')
    .then((response)=>{
        if(!response.ok){
            throw new Error(`Errore: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayDocs(data);
    })
    .catch(error => {
        console.error(error);
    })
});


function displayDocs(docs){
    let docContainer = document.getElementById("docsData");
    docContainer.innerHTML = '';

    let tableHead = document.createElement('tr');
    tableHead.id = 'tableHead';

    let tdUser = document.createElement('td');
    let userSpan = document.createElement('span');
    userSpan.textContent = 'Utente';
    tableHead.appendChild(tdUser);

    

    docContainer.appendChild(tableHead);

    for (let index = 0; index < docs.length; index++) {
        createContent(docs[index], docContainer);
    }
}

function createContent(doc, docContainer){

    let trData = document.createElement('tr');
    let tdUser = document.createElement('td');
    tdUser.textContent = `${doc.user.firstname} ${doc.user.lastname}`;
    trData.appendChild(tdUser);

    let tdType = document.createElement('td');
    tdType.textContent = `${doc.type}`;
    trData.appendChild(tdType);

    let tdButton = document.createElement('td');
    let view = document.createElement('a');
    view.href = '/document.html';
    let button = document.createElement('button');
    button.textContent = 'Visualizza';

    view.appendChild(button);
    tdButton.appendChild(view);
    trData.appendChild(tdButton);

    docContainer.appendChild(trData);
}