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

    if(docs == null){
        /* TODO: da vedere */
        let parag = document.createElement('p');
        parag.textContent = "Non sono presenti documenti da validare.";
    }else{
        let tableHead = document.createElement('tr');
        tableHead.id = 'tableHead';

        let thTable = document.createElement('th');
        let userStrong = document.createElement('strong');
        userStrong.textContent = "utente";
        thTable.appendChild(userStrong);
        tableHead.appendChild(thTable);

        let thDoc = document.createElement('th');
        let docStrong = document.createElement('strong');
        docStrong.textContent = "tipo di documento";
        thDoc.appendChild(docStrong);
        tableHead.appendChild(thDoc);

        let th = document.createElement('th');
        tableHead.appendChild(th);

        docContainer.appendChild(tableHead);

    
        for (let index = 0; index < docs.length; index++) {
            createContent(docs[index], docContainer);
        }
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
    view.href = /* `/document.html?id=${doc.id}` */'/document.html?id=3';
    let button = document.createElement('button');
    button.textContent = 'Visualizza';

    view.appendChild(button);
    tdButton.appendChild(view);
    trData.appendChild(tdButton);

    docContainer.appendChild(trData);
}