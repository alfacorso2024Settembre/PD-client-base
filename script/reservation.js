let off
let rowClicked;

function getLibri(offset) {
    off = offset;
    let url = 'http://localhost:8080/bibliotecaRest/app/biblioteca/getLibriParams?limit=20&offset=' + offset
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Errore: ${response.statusText}`);
        }
        return response.json();
    })
    .then(libri => {
        console.log('Libri:', libri);
        const tbody = document.querySelector('#reservation-table tbody');
        tbody.innerHTML = '';
        let count=0
        if (libri && libri.length > 0) {
            libri.forEach(libro => {
                count++
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${libro.idLibro}</td>
                    <td>${libro.titolo}</td>
                    <td>${libro.genere}</td>
                    <td>${libro.disponibile ? 'Sì' : 'No'}</td>
                `;
                tr.setAttribute("id","tableRowRes"+count);
                tr.addEventListener('click', function(){
                    counter=0
                    for(l of libri){
                        counter++
                        rowClicked = document.getElementById("tableRowRes"+counter)
                        rowClicked.style.backgroundColor = "#FFF"
                    }    
                    console.log("cliccato " + tr.id)
                    tr.style.backgroundColor = "#f1f1f1"
                    let prenotabtn = document.getElementById("btnPopupPrenota")
                    prenotabtn.disabled = false;
                })
                tbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5">Nessun libro trovato</td>`;
            tbody.appendChild(tr);
        }
    })
    .catch(error => {
        console.error('Errore nel recupero dei libri:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Errore nel caricamento dei libri, riprova più tardi.';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getLibri(0);
    let popupReservation = document.getElementById("popupReservation")
});


function popupPrenota(){
    popupReservation.style.display = "flex"
}

function closePrenota() {
    popupReservation.style.display = "none";
};

window.addEventListener("click", function(event) {
  if (event.target === popupReservation) {
    popupReservation.style.display = "none";
  }
});
