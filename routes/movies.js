var express = require('express');
var router = express.Router();
const {getAll, getById,create, update, remove, search} = require('../controllers/moviesController')

//api/movies
router.get('/',getAll); // ---> todas las peliculas
router.get('/search',search) // ---> buscador de pelicula
router.get('/:id',getById); //  ---> una pelicula según su id
router.post('/create',create); // ---> crea una pelicula
router.put('/update/:id',update) // ---> actualizo los datos
router.delete('/delete/:id',remove) // ---> elimino una pelicula

module.exports = router;
