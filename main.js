const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_LBDMVIoUdzbqbXWyYyIjdUWF1i5950H7ZMc9Y6fO9pIBSyF0hA0GvIYDF8UKkaOn";
const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?limit=3&api_key=live_LBDMVIoUdzbqbXWyYyIjdUWF1i5950H7ZMc9Y6fO9pIBSyF0hA0GvIYDF8UKkaOn";
const spanError = document.querySelector("#error");

// funcion para leer la data de la API
async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();
  console.log("Random");
  console.log(data);

  // validamos si el objeto response que devuelve es diferente a 200 es un error
  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error:  + ${response.status}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

loadRandomDogs();
