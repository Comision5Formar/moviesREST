const db = require('../database/models')

module.exports = {
    getAll : (req,res) => {
        db.Pelicula.findAll()
        .then(peliculas => {

            let data = {
                cantidad : peliculas.length,
                peliculas
            }

            return res.status(200).json(data)
        })
    },
    getById : (req,res) => {

    }
}