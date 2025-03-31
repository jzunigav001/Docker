document.addEventListener("DOMContentLoaded", function () {
    cargarPeliculas();

    // Agregar película
    document.getElementById("add-movie-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const precio = document.getElementById("precio").value;
        const stock = document.getElementById("stock").value;

        fetch("add_movie.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, genero, precio, stock })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message || data.error);
                if (!data.error) {
                    document.getElementById("add-movie-form").reset();
                    cargarPeliculas();
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // Editar película
    document.getElementById("edit-movie-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("edit-id").value;
        const titulo = document.getElementById("edit-titulo").value;
        const genero = document.getElementById("edit-genero").value;
        const precio = document.getElementById("edit-precio").value;
        const stock = document.getElementById("edit-stock").value;

        fetch("edit_movie.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, titulo, genero, precio, stock })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message || data.error);
                if (!data.error) {
                    document.getElementById("edit-movie-form").style.display = "none";
                    cargarPeliculas();
                }
            })
            .catch(error => console.error("Error al editar:", error));
    });
});

// Mostrar películas
function cargarPeliculas() {
    fetch("get_movies.php")
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movies-list");
            movieList.innerHTML = "";

            data.forEach(movie => {
                const movieCard = document.createElement("div");
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
}

// Función para preparar edición
function editMovie(id, titulo, genero, precio, stock) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-titulo").value = titulo;
    document.getElementById("edit-genero").value = genero;
    document.getElementById("edit-precio").value = precio;
    document.getElementById("edit-stock").value = stock;
    document.getElementById("edit-movie-form").style.display = "block";
}

// Cancelar edición
function cancelEdit() {
    document.getElementById("edit-movie-form").style.display = "none";
}

// Eliminar película
function deleteMovie(id) {
    if (!confirm("¿Seguro que quieres eliminar esta película?")) return;

    fetch("delete_movie.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            if (!data.error) {
                cargarPeliculas();
            }
        })
        .catch(error => console.error("Error al eliminar:", error));
}
