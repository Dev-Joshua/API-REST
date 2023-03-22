const API_URL = "https://api.thedogapi.com/v1/";
const RANDOM = "images/search";
const LIMIT = "?limit=2";
const API_KEY =
  "live_GFa3HlPNBLTz3Eww5PoLRNmP7C7vpWwKSnAdQaQCGaZZfYsSqkp1keGp9eSsuRIU";

const spanError = document.querySelector("#error");

// funcion para leer/conseguir la data de la API
async function loadRandomDogs() {
  const response = await fetch(`${API_URL}${RANDOM}${LIMIT}`);
  const data = await response.json();
  console.log("Random");
  console.log(data);

  // validamos si el objeto response que devuelve es diferente a 200 es un error
  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavoriteDogs() {
  const response = await fetch(`${API_URL}favourites?api_key=${API_KEY}`);
  const data = await response.json();
  console.log("Favoritos");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status} ${data.message}`;
  }
}

// funcion para guardar un gato en favoritos con el metodo 'POST'
async function saveFavoriteDog() {
  const response = await fetch(`${API_URL}favourites?limit=3`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: "akb",
    }),
  });

  const data = await response.text();

  console.log("Save");
  console.log(response);

  if (response.status == 401) {
    spanError.innerHTML = `Hubo un error:   ${response.status} ${data.message}`;
  }
}

loadRandomDogs();
loadFavoriteDogs();
// saveFavoriteDog();
