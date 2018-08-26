let params = (new URL(document.location)).searchParams;
let id = params.get("movieId");

let params2 = (new URL(document.location)).searchParams;
let search = params2.get("search");

const single_movies = document.querySelector('.single_movies');
const wrapper = document.querySelector('.wrapper');
const actors = document.querySelector('.actors');
const movie = document.querySelector('.movie_container');
const loader = document.querySelector('.loader');

const state = {
  movie: {},
  actors: []
};

function getMovie(id) {
  loader.classList.add('active');
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US`)
  .then(response => response.json())
  .then(data => state.movie = data);
}

getMovie(id)
  .then(renderMovie);

function renderMovie() {
  loader.classList.remove('active');
  document.body.style.background = ` 
  linear-gradient(
    rgba(64, 64, 122, .85), 
    rgba(44, 44, 84, .9)
  ), url('https://image.tmdb.org/t/p/w1280${state.movie.backdrop_path}')`;
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const movie_info = document.createElement('div');
  const movie_pic = document.createElement('div');


  const a = document.createElement('a');
  const linkText = document.createTextNode("Back");
  a.appendChild(linkText);
  a.title = "More Details";
  a.href =  'search.html' + "?search=" + search;


  movie_info.classList.add('movie_info');
  movie_pic.classList.add('movie_pic');
  img.src = `https://image.tmdb.org/t/p/w500${state.movie.poster_path}`;
  if(state.movie.poster_path === null) {
    img.src = `img/noImage.png`;
  }
  img.classList.add('movies_img');
  h2.innerHTML = state.movie.original_title;
  h3.innerHTML = state.movie.release_date;
  p.innerHTML = state.movie.overview;
  movie_pic.appendChild(img);
  movie_info.appendChild(h2);
  movie_info.appendChild(h3);
  movie_info.appendChild(p);
  movie.appendChild(movie_info);
  movie.appendChild(movie_pic);
  wrapper.appendChild(a);
  wrapper.appendChild(movie);
}

function getActors(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=b0994f6029743a2f030a3fed34413897`)
  .then(response => response.json())
  .then(data => {
    const filtered = data.cast.filter(person => person.profile_path !== null);
    state.actors = filtered;
  });
}

getActors(id)
  .then(renderActors);

function renderActors() {
  const cast = state.actors.slice(0, 6);
  const ul = document.createElement('ul');
  const h5 = document.createElement('h5');
  const movie_actors = document.createElement('div');
  movie_actors.classList.add('movie_actors');
  h5.textContent = 'Actors';
  movie_actors.appendChild(h5);
  ul.classList.add('actors');
  cast.forEach(actor => {
    const li = document.createElement('li');
    li.classList.add('actor');
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w185${actor.profile_path}`;
    img.classList.add('actor_img');
    li.appendChild(img);
    ul.appendChild(li);
    movie_actors.appendChild(ul);
    movie.appendChild(movie_actors);
    wrapper.appendChild(movie);
  });
}