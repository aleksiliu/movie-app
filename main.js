const form = document.querySelector('form');
const movies_div = document.querySelector('.movies_container');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const trending = document.querySelector('.trending');

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
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${state.trending.poster_path}`;
  img.classList.add('movies_img'); // rgba(64, 64, 122, .5),
  document.body.style.background = ` 
  linear-gradient(
    rgba(0, 0, 0, .1),  
    rgba(44, 44, 84, .7)
  ), url('https://image.tmdb.org/t/p/w1280${state.trending.backdrop_path}')`;
  const a = document.createElement('a');
  a.href =  'movie.html' + '?search=' + '&' + 'movieId=' + state.trending.id;
  a.classList.add('trending_movie');
  const trending_movie_info = document.createElement('div');
  const trending_movie_rating = document.createElement('div');
  const trending_movie_pic = document.createElement('div');
  trending_movie_info.classList.add('trending_movie_info');
  trending_movie_rating.classList.add('trending_movie_rating');
  trending_movie_pic.classList.add('trending_movie_pic');
  a.appendChild(trending_movie_info);
  a.appendChild(trending_movie_rating);
  a.appendChild(trending_movie_pic);
  trending_movie_info.appendChild(h2);
  trending_movie_info.appendChild(h3);
  trending_movie_rating.appendChild(p);
  trending_movie_pic.appendChild(img);
  trending.appendChild(a);
}

getTrendingData()
.then(renderTrending);

