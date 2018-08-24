let params = (new URL(document.location)).searchParams;
let result = params.get("search");
const movies_div = document.querySelector('.movies_container');
const loader = document.querySelector('.loader');
const input = document.querySelector('input');
const form = document.querySelector('form');

const state = {
  searchTerm: '',
  results: []
};

input.addEventListener('keyup', () => {
  state.searchTerm = input.value;
});

form.addEventListener("submit", function(e){
  e.preventDefault();
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set("search", state.searchTerm);
  window.location.search = searchParams.toString();
  getSearchData(state.searchTerm)
  .then(renderMovies);
});

getSearchData(result)
  .then(renderMovies);

function getSearchData(value) {
  loader.classList.add('active');
  movies_div.innerHTML = '';
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&query=${value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => state.results = data.results);
}

function renderMovies() {
  loader.classList.remove('active');
  movies_div.innerHTML = '';
  if (state.results === undefined || state.results.length == 0) {
    movies_div.innerHTML = 'No movies to show, bro.' + state.searchTerm;
  }
  state.results.forEach(movie => {
    const container = document.createElement('div');
    const movie_details = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const linkText = document.createTextNode("More Details ›");
    const single_movie = document.querySelector('.single_movie');
    a.appendChild(linkText);
    a.title = "More Details";
    a.href = "movie.html" + "?movieId=" + movie.id;
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if(movie.poster_path === null) {
      img.src = `/img/noImage.png`;
    }
    img.classList.add('movies_img');
    container.classList.add('movie');
    a.classList.add('more');
    h2.classList.add('title');
    h3.classList.add('subtitle');
    movie_details.classList.add('movie_details');
    h2.innerHTML = movie.original_title;
    h3.innerHTML = movie.release_date;
    p.innerHTML = movie.overview;
    container.appendChild(img);
    movie_details.appendChild(h2);
    movie_details.appendChild(h3);
    movie_details.appendChild(p);
    movie_details.appendChild(a);
    container.appendChild(movie_details);
    movies_div.appendChild(container);
  });
}