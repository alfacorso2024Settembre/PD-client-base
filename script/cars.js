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

function getUserLogged(){
  //DA SOSTITUIRE MOCK CON CHIAMATA GET A PDuserRS CON ID E RECUPERARE ID DA JWT
  const mockUser = {
    idUser: 1,
    firstname: "John",
    lastname: "Doe",
    gender: "Male",
    birthDate: "1980-01-01T00:00:00",
    phone: "1234567890",
    profilePicture: "fdsfs.jpg"
  };
  return mockUser;
}

async function postCar(event) {
  let userADD = getUserLogged();
  event.preventDefault();
  const plateADD = document.getElementById("plateADD").value;
  const brandADD = document.getElementById("brandADD").value;
  const modelADD = document.getElementById("modelADD").value;
  const displacementADD = document.getElementById("displacementADD").value;
  const gearADD = document.getElementById("gearADD").value;
  const numberADD = document.getElementById("numberADD").value;
  const ExpiryADD = document.getElementById("ExpiryADD").value;
  const insurancePhotoADD = document.getElementById("insurancePhotoADD").files[0];

  //chiamata post document
  let insurance;
  let bodyinsurance = {
    accepted:false,
    isValid:false,
    number: numberADD,
    expiryDate: ExpiryADD,
    photo: insurancePhotoADD,
    type: "INSURANCE"
    //inserire body
  }

  fetch("/users/{"+mockUser.idUser+"}/documents", {
    method: 'POST',
    body: bodyinsurance
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Errore: ${response.statusText}`);
    }
    return response.json();
})
.then(car => {
    console.log("Macchina inserita: " + JSON.stringify(car));
    insurance = bodyinsurance
})
.catch(error => {
    console.error('Errore nell aggiunta dell assicurazione:', error);
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = 'Errore nell aggiunta dell assicurazione, riprova più tardi.';
    }
});

  const formData = {
      plate: plateADD,
      brand: brandADD,
      model: modelADD,
      vehicleDisplacement: displacementADD,
      gearType: gearADD,
      user: userADD,
      insurance: insuranceADD
  };

  console.log(JSON.stringify(formData));

  //FETCH POST DOCUMENT --> THEN POST CAR 
    
  /*fetch(url, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Errore: ${response.statusText}`);
      }
      return response.json();
  })
  .then(car => {
      console.log('Car:', car);
      alert("Macchina inserita: " + JSON.stringify(car));
      getCars();
  })
  .catch(error => {
      console.error('Errore nell aggiunta della macchina:', error);
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
          errorMessage.textContent = 'Errore nell aggiunta della macchina, riprova più tardi.';
      }
  });*/
}
