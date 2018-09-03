let params = (new URL(document.location)).searchParams;
let result = params.get('search');
const movies_div = document.querySelector('.movies_container');
const loader = document.querySelector('.loader');
const input = document.querySelector('input');
const form = document.querySelector('form');

const state = {
  searchTerm: '',
  results: {
    movie: []
  }
};

state.searchTerm = result;

input.addEventListener('keyup', () => {
  state.searchTerm = input.value;
});

form.addEventListener('submit', function(e){
  e.preventDefault();
    if (history.pushState) {
      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?search=' + state.searchTerm;
      window.history.pushState({path:newurl},'',newurl);
    }
    getMovie();
});

getMovie();

function getMovie() {
  state.results.movie.page = 1;
  getMovieApi(state.searchTerm, state.results.movie.page)
    .then(data => state.results.movie = data)
    .then(renderMovies);
}

function getMoreMovies() {
  state.results.movie.page++;
  getMovieApi(state.searchTerm, state.results.movie.page)
    .then(function(response) {
          response.results.forEach(element => {
            state.results.movie.results.push(element);
          })
        })
    .then(renderMovies);
}

function getMovieApi(value, pageNumber) {
  loader.classList.add('active');
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&query=${value}&page=${pageNumber}&include_adult=false`)
    .then(response => response.json())
}

function renderMovies() {
  input.value = state.searchTerm;
  loader.classList.remove('active');
  movies_div.innerHTML = '';
  if (state.results.movie.results === undefined || state.results.movie.results.length == 0) {
    movies_div.innerHTML = '<p>No movies to show, bro.</p>';
  }

  const p_results = document.createElement('p');
  p_results.innerHTML = `Total results: ${state.results.movie.total_results}`;
  p_results.classList.add('results');
  movies_div.appendChild(p_results);

  state.results.movie.results.forEach(movie => {
    const movie_details = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const a = document.createElement('a');
    const single_movie = document.querySelector('.single_movie');
    a.href =  'movie.html' + '?search=' + state.searchTerm + '&' + 'movieId=' + movie.id;
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if(movie.poster_path === null) {
      img.src = `img/noImage.png`;
    }
    img.classList.add('movies_img');
    a.classList.add('more');
    h2.classList.add('title');
    h3.classList.add('subtitle');
    movie_details.classList.add('movie_details');
    h2.innerHTML = movie.original_title;
    h3.innerHTML = movie.release_date;
    p.innerHTML = movie.overview;
    a.appendChild(img);
    movie_details.appendChild(h2);
    movie_details.appendChild(h3);
    movie_details.appendChild(p);
    a.appendChild(movie_details);
    movies_div.appendChild(a);
  });
  if(state.results.movie.page < state.results.movie.total_pages) {
    const loadmore = document.createElement('div');
    loadmore.textContent = 'Load more';
    loadmore.classList.add('load');
    movies_div.appendChild(loadmore);
    const load = document.querySelector('.load');
    load.addEventListener('click', function() {
      getMoreMovies();
    });
  }
}