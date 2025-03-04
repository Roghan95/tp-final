const { models } = require("../../config/db");
const Movie = models.Movie;

async function listAllMovies() {
  const movies = await Movie.findAll();
  return movies;
}

async function getMovieById(id) {
  const movie = await Movie.findByPk(id);
  return movie;
}

async function createMovie(movieData) {
  return await Movie.create(movieData);
}

async function updateMovie(id, movieData) {
  const movie = await Movie.findByPk(id);
  await movie.update(movieData);
  return movie;
}

async function deleteMovie(id) {
  const movie = await Movie.findByPk(id);
  await movie.destroy();
}

module.exports = {
  listAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
