const db = require('../database/models');
const { Op } = require('sequelize')

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    getAll: (req, res) => {

        db.Pelicula.findAll()
            .then(peliculas => {

                peliculas.forEach(pelicula => {
                    pelicula.setDataValue('endpoint', getUrl(req) + '/' + pelicula.id)
                });

                let response = {
                    meta: {
                        link: getUrl(req),
                        cantidad: peliculas.length,
                        status: 200
                    },
                    data: peliculas
                }

                return res.status(200).json(response)
            })
            .catch(() => res.status(500))

    },
    getById: (req, res) => {
        db.Pelicula.findByPk(req.params.id)
            .then(pelicula => {
                if (pelicula) {
                    let response = {
                        meta: {
                            link: getUrl(req),
                            status: 200
                        },
                        data: pelicula
                    }
                    return res.status(200).json(response)

                } else {
                    let response = {
                        meta: {
                            status: 404,
                            msg: "ID no encontrado"
                        }
                    }
                    return res.status(404).json(response)
                }
            })
            .catch(() => res.status(500))
    },
    create: (req, res) => {
        const { title, rating, awards, release_date, length } = req.body
        db.Pelicula.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
            .then((pelicula) => {
                return res.status(201).json({
                    link: getBaseUrl(req) + '/api/movies/' + pelicula.id,
                    msg: "la pelicula fue agregada con éxito"
                })
            })
            .catch((error) => res.status(500).json(error))
    },
    update: (req, res) => {
        const { title, rating, awards, release_date, length } = req.body
        db.Pelicula.update({
            title,
            rating,
            awards,
            release_date,
            length
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then((pelicula) => {
                console.log(pelicula)
                if (pelicula[0]) {
                    return res.status(201).json({
                        msg: "la pelicula fue actualizada con éxito"
                    })
                } else {
                    return res.status(404).json({
                        msg: "no se hicieron cambios"
                    })
                }

            })
            .catch((error) => res.status(500).json(error))
    },
    remove: (req, res) => {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(response => {
                if (response) {
                    return res.status(200).json({
                        msg: "la pelicula fue borrada"
                    })
                } else {
                    return res.status(404).json({
                        msg: "no se hicieron cambios"
                    })
                }
            })
            .catch((error) => res.status(500).json(error))
    },
    search: (req, res) => {
        db.Pelicula.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.search_query}%`
                }
            }
        })
            .then(peliculas => {

                if (peliculas.length) {
                    peliculas.forEach(pelicula => {
                        pelicula.setDataValue('endpoint', getUrl(req) + '/' + pelicula.id)
                    });

                    let response = {
                        meta: {
                            link: getUrl(req),
                            cantidad: peliculas.length,
                            status: 200
                        },
                        data: peliculas
                    }
                    return res.status(200).json(response)
                } else {
                    let response = {
                        meta: {
                            status: 404
                        },
                        msg: 'no hubo resultados'
                    }
                    return res.status(404).json(response)

                }
            })
            .catch(() => res.status(500))



    }
}