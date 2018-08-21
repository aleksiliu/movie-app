const form = document.querySelector('form');
const movies_div = document.querySelector('.movies_container');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const trending_div = document.querySelector('.trending_movie');
const trending_info = document.querySelector('.trending_movie_info');

const state = {
  searchTerm: '',
  results: [],
  trending: undefined 
};


input.addEventListener('keyup', () => {
  state.searchTerm = input.value;
});

function getTrendingData() {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=b0994f6029743a2f030a3fed34413897`)
    .then(response => response.json())
    .then(data => state.trending = data.results[Math.floor(Math.random()*data.results.length)]);
}

function renderTrending() {
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  h2.classList.add('title');
  h3.classList.add('subtitle');
  const p = document.createElement('p');
  p.classList.add('rating');
  h2.innerHTML = state.trending.original_title;
  h3.innerHTML = state.trending.release_date;
  p.innerHTML = `${state.trending.vote_average} <span class="rating_text">Rating</span>`;
  const a = document.createElement('a');
  const linkText = document.createTextNode("More Details ›");
  a.appendChild(linkText);
  a.title = "More Details";
  a.href = "movie.html" + "?movieId=" + state.trending.id;
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${state.trending.poster_path}`;
  img.classList.add('movies_img');
  document.body.style.background = ` 
  linear-gradient(
    rgba(64, 64, 122, .7), 
    rgba(44, 44, 84, .9)
  ), url('https://image.tmdb.org/t/p/w1280${state.trending.backdrop_path}')`;
  trending_info.appendChild(h2);
  trending_info.appendChild(h3);
  trending_div.appendChild(p);
  trending_info.appendChild(a);
  trending_div.appendChild(img);
}

getTrendingData()
.then(renderTrending);

// background: url("") center center / cover no-repeat;

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
  if (state.results === undefined || state.results.length == 0) {
    movies_div.innerHTML = 'No movies to show, bro.';
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
    movie_details.appendChild(a);
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
    container.appendChild(movie_details);
    movies_div.appendChild(container);
  });
}


