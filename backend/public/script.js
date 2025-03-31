document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/get_movies.php")  // Llama al backend
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            let movieList = document.getElementById("movies-list");
            movieList.innerHTML = "";  // Limpia el contenido previo

            data.forEach(movie => {
                let movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <h3>${movie.titulo}</h3>
                    <p>Género: ${movie.genero}</p>
                    <p>Precio: $${movie.precio}</p>
                    <p>Stock: ${movie.stock}</p>
                `;
                movieList.appendChild(movieCard);
            });
        })
        .catch(error => console.error("Error cargando las películas:", error));
});

document.getElementById("add-movie-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Evitar que la página se recargue

    let titulo = document.getElementById("titulo").value;
    let genero = document.getElementById("genero").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;

    fetch("http://localhost:8080/add_movie.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ titulo, genero, precio, stock })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
        if (!data.error) {
            document.getElementById("add-movie-form").reset(); // Limpiar formulario
            location.reload(); // Recargar la lista de películas
        }
    })
    .catch(error => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/get_movies.php")  // Llama al backend
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            let movieList = document.getElementById("movies-list");
            movieList.innerHTML = "";  // Limpia el contenido previo

            data.forEach(movie => {
                let movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <h3>${movie.titulo}</h3>
                    <p>Género: ${movie.genero}</p>
                    <p>Precio: $${movie.precio}</p>
                    <p>Stock: ${movie.stock}</p>
                    <button onclick="editMovie(${movie.id}, '${movie.titulo}', '${movie.genero}', ${movie.precio}, ${movie.stock})">Editar</button>
                `;
                movieList.appendChild(movieCard);
            });
        })
        .catch(error => console.error("Error cargando las películas:", error));
});

// Función para llenar el formulario de edición y mostrarlo
function editMovie(id, titulo, genero, precio, stock) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-titulo").value = titulo;
    document.getElementById("edit-genero").value = genero;
    document.getElementById("edit-precio").value = precio;
    document.getElementById("edit-stock").value = stock;
    document.getElementById("edit-movie-form").style.display = "block";
}

// Función para cancelar la edición
function cancelEdit() {
    document.getElementById("edit-movie-form").style.display = "none";
}

// Manejar el envío del formulario de edición
document.getElementById("edit-movie-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let id = document.getElementById("edit-id").value;
    let titulo = document.getElementById("edit-titulo").value;
    let genero = document.getElementById("edit-genero").value;
    let precio = document.getElementById("edit-precio").value;
    let stock = document.getElementById("edit-stock").value;

    fetch("http://localhost:8080/edit_movie.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, titulo, genero, precio, stock })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
        if (!data.error) {
            document.getElementById("edit-movie-form").style.display = "none"; // Ocultar formulario
            location.reload(); // Recargar la lista de películas
        }
    })
    .catch(error => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/get_movies.php")  // Llama al backend
        .then(response => response.json())  // Convierte la respuesta en JSON
        .then(data => {
            let movieList = document.getElementById("movies-list");
            movieList.innerHTML = "";  // Limpia el contenido previo

            data.forEach(movie => {
                let movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <h3>${movie.titulo}</h3>
                    <p>Género: ${movie.genero}</p>
                    <p>Precio: $${movie.precio}</p>
                    <p>Stock: ${movie.stock}</p>
                    <button onclick="editMovie(${movie.id}, '${movie.titulo}', '${movie.genero}', ${movie.precio}, ${movie.stock})">Editar</button>
                    <button onclick="deleteMovie(${movie.id})">Eliminar</button>
                `;
                movieList.appendChild(movieCard);
            });
        })
        .catch(error => console.error("Error cargando las películas:", error));
});

// Función para eliminar una película
function deleteMovie(id) {
    if (!confirm("¿Seguro que quieres eliminar esta película?")) {
        return;
    }

    fetch("http://localhost:8080/delete_movie.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
        if (!data.error) {
            location.reload(); // Recargar la lista de películas
        }
    })
    .catch(error => console.error("Error al eliminar la película:", error));
}

