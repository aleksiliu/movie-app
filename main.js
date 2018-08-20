const form = document.querySelector('form');
const movies_div = document.querySelector('.movies_container');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');

const state = {
  searchTerm: '',
  results: []
};

input.addEventListener('keyup', () => {
  state.searchTerm = input.value;
});

form.addEventListener("submit", function(e){
  e.preventDefault();
  getSearchData(state.searchTerm)
    .then(renderMovies);
  input.value = '';
})

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
  // movies_div.appendChild(loader);
  if (state.results === undefined || state.results.length == 0) {
    movies_div.innerHTML = 'No movies to show, bro.';
  }
  state.results.forEach(movie => {
    const container = document.createElement('div');
    const movie_info = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h2');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const linkText = document.createTextNode("More Details ›");
    const single_movie = document.querySelector('.single_movie');
    a.appendChild(linkText);
    a.title = "More Details";
    a.href = "movie.html" + "?movieId=" + movie.id;
    movie_info.appendChild(a);
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if(movie.poster_path === null) {
      img.src = `/img/noImage.png`;
    }
    img.classList.add('movies_img');
    container.classList.add('movie');
    a.classList.add('more');
    h2.classList.add('title');
    h3.classList.add('subtitle');
    movie_info.classList.add('movie_info');
    h2.innerHTML = movie.original_title;
    h3.innerHTML = movie.release_date;
    p.innerHTML = movie.overview;
    container.appendChild(img);
    movie_info.appendChild(h2);
    movie_info.appendChild(h3);
    movie_info.appendChild(p);
    container.appendChild(movie_info);
    movies_div.appendChild(container);
  });
}


