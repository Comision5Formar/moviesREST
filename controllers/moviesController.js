const db = require('../database/models');

module.exports = {
    getAll : (req,res) => {
        const url = req.protocol + '://' + req.get('host') + req.originalUrl

        db.Pelicula.findAll()
        .then(peliculas => {

            peliculas.forEach(pelicula => {
                pelicula.setDataValue('endpoint',url + '/' +pelicula.id)
            });

            let data = {
                meta :{
                    link :  url,
                    cantidad : peliculas.length
                },
                data : peliculas
                
            }

            return res.status(200).json(data)
        })
    },
    getById : (req,res) => {

    }
}