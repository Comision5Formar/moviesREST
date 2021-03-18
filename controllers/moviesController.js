const db = require('../database/models');

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
 
module.exports = {
    getAll : (req,res) => {

        db.Pelicula.findAll()
        .then(peliculas => {

            peliculas.forEach(pelicula => {
                pelicula.setDataValue('endpoint',getUrl(req) + '/' +pelicula.id)
            });

            let response = {
                meta :{
                    link :  getUrl(req),
                    cantidad : peliculas.length,
                    status : 200
                },
                data : peliculas
            }

            return res.status(200).json(response)
        })
    },
    getById : (req,res) => {
        db.Pelicula.findByPk(req.params.id)
        .then(pelicula => {
            let response = {
                meta : {
                    link : getUrl(req),
                    status : 200
                },
                data : pelicula
            }
            return res.status(200).json(response)
        })
        .catch(() => res.status(500))
    },
    create : (req,res) => {
        const {title,rating,awards,release_date,length} = req.body
        db.Pelicula.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
        .then(()=> {
            return res.status(201).json({
                msg : "la pelicula fue agregada con éxito"
            })
        })
        .catch(() => res.status(500))
    }
}