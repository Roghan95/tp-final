const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", movieController.listAllMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", auth, movieController.createMovie);
router.put("/:id", auth, movieController.updateMovie);
router.delete("/:id", auth, movieController.deleteMovie);

module.exports = router;
