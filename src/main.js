// Inserto axios en el proyecto solamente para la funcion(saveFavoriteDog)

const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
});
api.defaults.headers.common["X-API-KEY"] =
  "live_GFa3HlPNBLTz3Eww5PoLRNmP7C7vpWwKSnAdQaQCGaZZfYsSqkp1keGp9eSsuRIU";
const API_URL = "https://api.thedogapi.com/v1/";
const RANDOM = "images/search";
const LIMIT = "?limit=12";
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
    // btn1.onclick = () => saveFavoriteDog(data[0].id);
    // btn2.onclick = () => saveFavoriteDog(data[1].id);

    const sectionDiv = document.getElementById("divContainer");
    sectionDiv.innerHTML = "";

    data.forEach((dog) => {
      sectionDiv.innerHTML += `
      <article>
        <a class="block">
          <div class="span">
            <button id="btn" onclick="
              saveFavoriteDog('${dog.id}')">Adóptame ❤</button>
          </div>
          <img src="${dog.url}"  alt="doggie pic" />
        </a>
      </article>
      `;
    });
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
    const section = document.getElementById("containerDogs");
    section.innerHTML = "";

    // const h2 = document.createElement("h2");
    // const h2Text = document.createTextNode("Perritos Adoptados");
    // h2.appendChild(h2Text);
    // section.appendChild(h2);

    data.forEach((dog) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const span = document.createElement("span");
      const btnText = document.createTextNode("Quitar de la lista");

      img.src = dog.image.url;
      img.width = 150;
      span.appendChild(btnText);
      btn.appendChild(span);

      btn.onclick = () => deleteFavoriteDog(dog.id);

      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

// funcion para guardar un gato en favoritos con el metodo 'POST'
async function saveFavoriteDog(id) {
  /* const response = await fetch(`${API_URL}favourites`, {
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
  */

  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });

  console.log("Save");

  // console.log("Save");
  // console.log(response);

  if (status !== 200) {
    spanError.innerHTML = `Hubo un error:   ${status} ${data.message}`;
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
