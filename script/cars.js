let rowClicked

function openModifyPopup(){
    console.log("cliccato");
    popupModifyCar.style.display = "flex"
}

function closeModifyPopup() {
  popupModifyCar.style.display = "none";
};

window.addEventListener("click", function(event) {
  if (event.target === popupModifyCar) {
    popupModifyCar.style.display = "none";
  }
  if (event.target === popupAddCar) {
    popupAddCar.style.display = "none";
  }
});

function openAddPopup(){
  console.log("cliccato");
  popupAddCar.style.display = "flex"
}

function closeAddPopup() {
  popupAddCar.style.display = "none";
};

document.addEventListener('DOMContentLoaded', function() {
  getCars();
  let popupAddCar = document.getElementById("popupReservation")
});

function getCars() {
  let url = ''
  fetch(url)
  .then((response) => {
      if (!response.ok) {
          throw new Error(`Errore: ${response.statusText}`);
      }
      return response.json();
  })
  .then(car => {
      console.log('Cars:', car);
      const tbody = document.querySelector('#reservation-table tbody');
      tbody.innerHTML = '';
      let count=0
      if (car && car.length > 0) {
          car.forEach(macchine => {
              count++
              const tr = document.createElement('tr');
              tr.innerHTML = `
                  <td>${macchine.model + " " + macchine.brand}</td>
                  <td>${macchine.displacement}</td>
                  <td>${macchine.gear}</td>
                  <td>${macchine.insured}</td> <!--fare switch case che in base all'enum restituito inserisce l'immagine-->
              `;
              tr.setAttribute("id","tableRowRes"+count);
              tr.addEventListener('click', function(){
                  counter=0
                  for(c of car){
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
          tr.innerHTML = `<td colspan="5">Nessuna macchina trovata</td>`;
          tbody.appendChild(tr);
      }
  })
  .catch(error => {
      console.error('Errore nel recupero delle macchine:', error);
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Errore nel caricamento delle macchine, riprova più tardi.';
  });
}