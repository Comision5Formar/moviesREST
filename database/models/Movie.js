module.exports = (sequelize, dataTypes) => {

    const alias = 'Pelicula';

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false,
            validate : {
                notNull : {
                    msg : "El campo title no puede ser nulo"
                }
            }
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false,
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            defaultValue : 0
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
    }

    const config = {
        tableName : 'movies',
        timestamps : true,
        underscored : true
    }

    const Movie = sequelize.define(alias, cols, config)

    Movie.associate = function(models){
        Movie.belongsTo(models.Genero,{
            as : 'genero',
            foreignKey : 'genre_id'
        })
    }

    return Movie
}