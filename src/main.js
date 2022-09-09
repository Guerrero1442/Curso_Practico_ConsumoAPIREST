import { API_KEY } from "./secrets.js";
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

// Utils

function createMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach((movie) => {
        // TODO: agrego los contenidos a mi html creando elementos
        // 	<div class="movie-container">
        // 	<img src="https://www.themoviedb.org/t/p/w220_and_h330_face/b7EIwmXtQBEyrLHcUEyuJxPoARk.jpg"
        // 		alt="Nombre de la pelicula" class="movie-img">
        // 	</div>
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + movie.poster_path);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";
    categories.forEach((category) => {
        // TODO: agrego los contenidos a mi html creando elementos
        // <section id="categoriesPreview" class="categoriesPreview-container">
        // 	<h2 class="categoriesPreview-title">Categorías</h2>
        // 	<!-- Estructura para mostrar las categorias -->
        // 	<article class="categoriesPreview-list">
        // 		<div class="category-container">
        // 			<h3 id="id28" class="category-title">Romance</h3>
        // 		</div>
        // 	</article>
        // </section>
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", "id" + category.id);
        // ? cada que se le de click a una categoria nos cambia el hash
        categoryTitle.addEventListener("click", () => {
            location.hash = "#category=" + category.id + "-" + category.name;
        });
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//Llamados a la API

// Traer la tendencia de peliculas de la ultima semana
export async function getTrendingMoviesPreview() {
    //* Traigo la informacion de la url
    const { data } = await api("trending/movie/day");
    const movies = data.results;

    //* Recorro cada pelicula de los datos recogidos
    createMovies(movies, trendingMoviesPreviewList);
}
// Traer todos los generos de las peliculas
export async function getCategoriesMoviesPreview() {
    //* Traigo la informacion de la url
    const { data } = await api("genre/movie/list");
    const categories = data.genres;

    //* Recorro cada pelicula de los datos recogidos
    createCategories(categories, categoriesPreviewList);
}

export async function getMoviesByCategory(id) {
    //* Traigo la informacion de la url
    const { data } = await api("discover/movie", {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    //* Recorro cada pelicula de los datos recogidos
    createMovies(movies, genericSection);
}
export async function getMoviesBySearch(query) {
    //* Traigo la informacion de la url
    const { data } = await api("search/movie", {
        params: {
            query: query,
        },
    });
    const movies = data.results;

    //* Recorro cada pelicula de los datos recogidos
    createMovies(movies, genericSection);
}

export async function getCompleteTrendingMovies() {
    //* Traigo la informacion de la url
    const { data } = await api("trending/movie/day");
    const movies = data.results;

    //* Recorro cada pelicula de los datos recogidos
    createMovies(movies, genericSection);
}
