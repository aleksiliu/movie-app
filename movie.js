let params = (new URL(document.location)).searchParams;
let id = params.get("movieId");
const single_movies = document.querySelector('.single_movies');
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
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h2');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const single_movie = document.querySelector('.single_movie');
  img.src = `https://image.tmdb.org/t/p/w342${state.movie.poster_path}`;
  if(state.movie.poster_path === null) {
    img.src = `img/noImage.png`;
  }
  img.classList.add('movies_img');
  h2.classList.add('title');
  h3.classList.add('subtitle');
  h2.innerHTML = state.movie.original_title;
  h3.innerHTML = state.movie.release_date;
  p.innerHTML = state.movie.overview;
  single_movie.appendChild(img);
  single_movie.appendChild(h2);
  single_movie.appendChild(h3);
  single_movie.appendChild(p);
  single_movies.appendChild(single_movie);
}

function getActors(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=b0994f6029743a2f030a3fed34413897`)
  .then(response => response.json())
  .then(data => state.actors = data.cast);
}

getActors(id)
  .then(renderActors);

function renderActors() {
  const cast = state.actors.slice(0, 6);
  const ul = document.createElement('ul');
  ul.classList.add('actors');
  cast.forEach(actor => {
    const single_actor = document.querySelector('.single_actor');
    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const h5 = document.createElement('h5');
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w185${actor.profile_path}`;
    if(actor.profile_path === null) {
      img.src = `/img/noImage.png`;
    }
    img.classList.add('actor_img');
    h4.innerHTML = actor.character;
    h5.innerHTML = actor.name;
    h4.classList.add('title');
    h5.classList.add('subtitle');
    li.appendChild(img);
    li.appendChild(h4);
    li.appendChild(h5);
    ul.appendChild(li);
    single_actor.appendChild(ul);
  });
}