const movieService = require("../services/movie.service");

async function listAllMovies(req, res) {
  try {
    const movies = await movieService.listAllMovies();
    console.log(movies); // Log the movies for debugging
    res.status(200).json(movies);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function createMovie(req, res) {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateMovie(req, res) {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteMovie(req, res) {
  try {
    await movieService.deleteMovie(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
