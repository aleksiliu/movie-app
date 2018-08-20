let params = (new URL(document.location)).searchParams;
let id = params.get("movieId");
const wrapper = document.querySelector('.wrapper');
const actors = document.querySelector('.actors');

function getMovie(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US`)
  .then(response => response.json())
  .then(data => {
    renderMovie(data, id);
 });
}

getMovie(id);

function renderMovie(data, id) {
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h2');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const single_movie = document.querySelector('.single_movie');
  img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  if(data.poster_path === null) {
    img.src = `img/noImage.png`;
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
  getActors(id);
}

function getActors(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=b0994f6029743a2f030a3fed34413897`)
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