const API_URL = "https://api.thedogapi.com/v1/";
const RANDOM = "images/search";
const LIMIT = "?limit=2";
const API_KEY =
  "live_GFa3HlPNBLTz3Eww5PoLRNmP7C7vpWwKSnAdQaQCGaZZfYsSqkp1keGp9eSsuRIU";

const API_URL_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=`;

const spanError = document.querySelector("#error");

// funcion para leer/conseguir la data de la API
async function loadRandomDogs() {
  const response = await fetch(`${API_URL}${RANDOM}${LIMIT}`);
  const data = await response.json();
  console.log("Random");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteDog(data[0].id);
    btn2.onclick = () => saveFavoriteDog(data[1].id);
  }
}

// fetch por defecto viene de tipo GET
async function loadFavoriteDogs() {
  const response = await fetch(`${API_URL}favourites?`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("Favoritos");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Hubo un error: ${response.status} ${data.message}`;
  } else {
    const section = document.getElementById("adoptedDogs");
    section.innerHTML = "";

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Perritos Adoptados");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((dog) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar perrito de adoptados");

      img.src = dog.image.url;
      img.width = 150;
      btn.appendChild(btnText);

      btn.onclick = () => deleteFavoriteDog(dog.id);

      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

// funcion para guardar un gato en favoritos con el metodo 'POST'
async function saveFavoriteDog(id) {
  const response = await fetch(`${API_URL}favourites?limit=3`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await response.text();

  console.log("Save");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error:   ${response.status} ${data.message}`;
  } else {
    console.log("Perrito añadido a la lista de adoptados");
    loadFavoriteDogs();
  }
}

// eliminar un elemento dog de favoritos(api_url_delete)
async function deleteFavoriteDog(id) {
  const response = await fetch(API_URL_DELETE(id), {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Error: " + response.status + " " + data.message;
  } else {
    console.log("Eliminado de la lista");
    loadFavoriteDogs();
  }
}

async function uploadDogPhoto() {
  const form = document.getElementById("form");
  const formData = new FormData(form);

  //Quiero obtemer la llave file
  console.log(formData.get("file"));

  const response = await fetch(`${API_URL}images/upload`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      // "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await response.json();

  console.log("Save");
  console.log(response);

  if (response.status !== 201) {
    spanError.innerHTML = `Hubo un error:   ${response.status} ${data.message}`;
  } else {
    console.log("Foto cargada con exito");
    console.log({ data });
    console.log(data.url);
    saveFavoriteDog(data.id);
  }
}

loadRandomDogs();
loadFavoriteDogs();
// saveFavoriteDog();
