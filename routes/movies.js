var express = require('express');
var router = express.Router();
const {getAll, getById} = require('../controllers/moviesController')

//api/movies
router.get('/',getAll); // => http://localhost:5000/ ---> todas las peliculas
router.get('/:id',getById); // => http://localhost:5000/{id} ---> una pelicula según su id

module.exports = router;
