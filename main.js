'use strict'

console.log('Tamoh ready');

const kittenData_1 = {
  image: "https://dev.adalab.es/gato-siames.webp",
  name: "Anastacio",
  desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
  race: "Siamés",
};

const kittenData_2 = {
  image: "https://dev.adalab.es/sphynx-gato.webp",
  name: "Fiona",
  desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
  race: "Sphynx",
};

const kittenData_3 = {
  image: "https://dev.adalab.es/maine-coon-cat.webp",
  name: "Cielo",
  desc: "Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
  race: "Maine Coon",
};

const kittenData_4 = {
  image:
    "https://wallpapers.com/images/high/ugly-cat-pictures-29bvym5p5noaqikb.webp",
  name: "Sinsajo",
  desc: "Gato de prueba",
  race: "",
};

const kittenDataList = [kittenData_1, kittenData_2, kittenData_3, kittenData_4];

const list = document.querySelector(".js-list");
const buttonAdd = document.querySelector(".js-btn-add");
const newForm = document.querySelector(".js-new-form");

function showNewCatForm() {
  newForm.classList.remove("collapsed");
}

function hideNewCatForm() {
  newForm.classList.add("collapsed");
  inputs.forEach((input) => (input.value = ""));
}

function handleClickNewCatForm(event) {
  event.preventDefault();

  if (newForm.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

buttonAdd.addEventListener("click", handleClickNewCatForm);

const buttonCancel = document.querySelector(".button-cancel");
const inputs = newForm.querySelectorAll(".js-new-form .input");

const cancelNewKitten = (event) => {
  hideNewCatForm();
  inputs.forEach((input) => (input.value = "")); // Limpia los inputs cada vez
};

buttonCancel.addEventListener("click", cancelNewKitten);

const inputSearchDesc = document.querySelector(".js_in_search_desc");
const inputSearchRace = document.querySelector(".js_in_search_race");

// ---- renderKitten ----
function renderKitten(kittenData) {
  function renderRace(race) {
    return race === "" ? "¡Uy que despiste, no sabemos su raza!" : race;
  }

  const breedText = renderRace(kittenData.race);

  return `
    <li class='card'>
      <article>
        <img class='card_img' src=${kittenData.image} alt='${
    kittenData.name
  }-cat' />
        <h3 class='card_title'>${kittenData.name.toUpperCase()}</h3>
        <h4 class='card_race'>${breedText}</h4>
        <p class='card_description'>${kittenData.desc}</p>
      </article>
    </li>`;
}
// ---- renderKittenList ----
function renderKittenList(kittenDataList) {
  list.innerHTML = "";
  kittenDataList.forEach((kittenItem) => {
    list.innerHTML += renderKitten(kittenItem);
  });
}

// ---- filterKitten ----
const searchButton = document.querySelector(".js_button-search");

const filterKitten = (ev) => {
  ev.preventDefault();
  const descrSearchText = inputSearchDesc.value.toLowerCase().trim();
  const raceSearchText = inputSearchRace.value.toLowerCase().trim();

  list.innerHTML = "";

  // validación
  if (descrSearchText === "" && raceSearchText === "") {
    alert("Escribe al menos raza o descripción");
    return; // importante: salimos de la función
  }

  list.innerHTML = "";

  kittenDataList.forEach((kitten) => {
    const matchDesc =
      descrSearchText === "" ||
      kitten.desc.toLowerCase().includes(descrSearchText);
    const matchRace =
      raceSearchText === "" ||
      kitten.race.toLowerCase().includes(raceSearchText);

    if (matchDesc && matchRace) {
      list.innerHTML += renderKitten(kitten);
    }
  });
};

renderKittenList(kittenDataList);

searchButton.addEventListener("click", filterKitten);