const form = document.querySelector('form');
const movies_div = document.querySelector('.movies_container');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const trending_div = document.querySelector('.trending_movie');
const trending_info = document.querySelector('.trending_movie_info');

const state = {
  searchTerm: '',
  trending: undefined 
};

form.addEventListener('submit', function(e){
  e.preventDefault();
  window.location.href = 'search.html' + '?search=' + state.searchTerm;
})

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
  const p = document.createElement('p');
  p.classList.add('rating');
  h2.innerHTML = state.trending.original_title;
  h3.innerHTML = state.trending.release_date;
  p.innerHTML = `${state.trending.vote_average} <span class="rating_text">Rating</span>`;
  const a = document.createElement('a');
  const linkText = document.createTextNode('More Details ›');
  a.appendChild(linkText);
  a.title = 'More Details';
  a.href = 'movie.html' + '?search=' + '&' + 'movieId=' + state.trending.id;
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${state.trending.poster_path}`;
  img.classList.add('movies_img'); // rgba(64, 64, 122, .5),
  document.body.style.background = ` 
  linear-gradient(
    rgba(0, 0, 0, .1),  
    rgba(44, 44, 84, .7)
  ), url('https://image.tmdb.org/t/p/w1280${state.trending.backdrop_path}')`;
  trending_info.appendChild(h2);
  trending_info.appendChild(h3);
  trending_div.appendChild(p);
  trending_info.appendChild(a);
  trending_div.appendChild(img);
}

getTrendingData()
.then(renderTrending);

