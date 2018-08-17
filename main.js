const form = document.querySelector('form');
const movies_div = document.querySelector('.movies');
const wrapper = document.querySelector('.wrapper');
const actors = document.querySelector('.actors');

form.addEventListener("submit", function(e){
  e.preventDefault();
  const input = document.querySelector('input');
  movies_div.innerHTML = '';
  getSearchData(input.value);
  input.value = '';
})

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US`)
  .then(response => response.json())
  .then(data => {
    renderMovie(data, movieId);
 });
}

function renderMovie(data, movieId) {
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h2');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const single_movie = document.querySelector('.single_movie');
  img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  if(data.poster_path === null) {
    img.src = `/img/noImage.png`;
  }
  img.classList.add('movies_img');
  h2.classList.add('title');
  h3.classList.add('subtitle');
  h2.innerHTML = data.original_title;
  h3.innerHTML = data.release_date;
  p.innerHTML = data.overview;
  single_movie.appendChild(img);
  single_movie.appendChild(h2);
  single_movie.appendChild(h3);
  single_movie.appendChild(p);
  wrapper.appendChild(single_movie);
  getActors(movieId);
  console.log(data);
}

function getActors(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b0994f6029743a2f030a3fed34413897`)
  .then(response => response.json())
  .then(data => {
    const cast = data.cast;
    const ul = document.createElement('ul');
    ul.classList.add('actors');
    cast.forEach(movie => {
      const single_movie = document.querySelector('.single_movie');
      const li = document.createElement('li');
      const h4 = document.createElement('h4');
      const h5 = document.createElement('h5');
      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w200${movie.profile_path}`;
      if(movie.profile_path === null) {
        img.src = `/img/noImage.png`;
      }
      img.classList.add('actor_img');
      h4.innerHTML = movie.character;
      h5.innerHTML = movie.name;
      h4.classList.add('title');
      h5.classList.add('subtitle');
      li.appendChild(img);
      li.appendChild(h4);
      li.appendChild(h5);
      ul.appendChild(li);
      single_movie.appendChild(ul);
    });
 });
}

function getSearchData(value) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&query=${value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      if (data.total_results == 0) {
        movies_div.innerHTML = 'No movies to show, bro. Search entry: ' + value ;
      } else {
        renderMovies(data.results);
      }
  });
}

function renderMovies(data) {
  data.forEach(movie => {
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
    a.addEventListener("click", function() {
      movieSelected(movie.id);
    });
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


