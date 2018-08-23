let params = (new URL(document.location)).searchParams;
let id = params.get("movieId");
const single_movies = document.querySelector('.single_movies');
const wrapper = document.querySelector('.wrapper');
const actors = document.querySelector('.actors');

const state = {
  movie: {},
  actors: []
};

function getMovie(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US`)
  .then(response => response.json())
  .then(data => state.movie = data);
}

getMovie(id)
  .then(renderMovie);

function renderMovie() {
  document.body.style.background = ` 
  linear-gradient(
    rgba(64, 64, 122, .95), 
    rgba(44, 44, 84, .95)
  ), url('https://image.tmdb.org/t/p/w1280${state.movie.backdrop_path}')`;
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const movie_info = document.createElement('div');
  movie_info.classList.add('movie_info');
  img.src = `https://image.tmdb.org/t/p/w342${state.movie.poster_path}`;
  if(state.movie.poster_path === null) {
    img.src = `img/noImage.png`;
  }
  img.classList.add('movies_img');
  h2.innerHTML = state.movie.original_title;
  h3.innerHTML = state.movie.release_date;
  p.innerHTML = state.movie.overview;
  movie_info.appendChild(img);
  movie_info.appendChild(h2);
  movie_info.appendChild(h3);
  movie_info.appendChild(p);
  wrapper.appendChild(movie_info);
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
  const movie_actors = document.createElement('div');
  movie_actors.classList.add('movie_actors');
  ul.classList.add('actors');
  cast.forEach(actor => {
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const h5 = document.createElement('h5');
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w185${actor.profile_path}`;
    img.classList.add('actor_img');
    h4.innerHTML = actor.character;
    h5.innerHTML = actor.name;
    h4.classList.add('title');
    h5.classList.add('subtitle');
    li.appendChild(img);
    li.appendChild(h4);
    li.appendChild(h5);
    ul.appendChild(li);
    movie_actors.appendChild(ul);
    wrapper.appendChild(movie_actors);
  });
}