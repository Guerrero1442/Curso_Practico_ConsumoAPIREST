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
// Traer la tendencia de peliculas de la ultima semana
export async function getTrendingMoviesPreview() {
    //* Traigo la informacion de la url
    const { data } = await api("trending/movie/day");
    const movies = data.results;

    //* Recorro cada pelicula de los datos recogidos
    movies.forEach((movie) => {
        const trendingMoviesPreviewList = document.querySelector(
            "#trendingPreview .trendingPreview-movieList"
        );

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
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}
// Traer todos los generos de las peliculas
export async function getCategoriesMoviesPreview() {
    //* Traigo la informacion de la url
    const { data } = await api("genre/movie/list");
    const categories = data.genres;

    //* Recorro cada pelicula de los datos recogidos
    categories.forEach((category) => {
        const categoriesPreviewList = document.querySelector(
            "#categoriesPreview .categoriesPreview-list"
        );

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
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}
