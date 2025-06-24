const API_KEY = "add_your_api_key";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movie-list");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close");

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) fetchMovies(searchTerm);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

function fetchMovies(query) {
  movieList.innerHTML = "<p>Loading movies...</p>";
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        movieList.innerHTML = `<p>No results found for "${query}"</p>`;
      }
    });
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year} • ${movie.Type}</p>
      <button onclick="getMovieDetails('${movie.imdbID}')">View Details</button>
    `;
    movieList.appendChild(card);
  });
}

function getMovieDetails(id) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      showModal(data);
    });
}

function showModal(movie) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <h2 style="text-align:center">${movie.Title}</h2>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
  `;
}

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
