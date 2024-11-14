const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const popup = document.getElementById("popup");

function open(){
    console.log("cliccato");
    popup.style.display = "flex"
}

function close() {
  popup.style.display = "none";
};

window.addEventListener("click", function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

