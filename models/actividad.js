const { Schema, model } = require( 'mongoose' );

const actividadeSchema = Schema( {
    actividad:{
        type: String,
        required: [ true, 'La actividad es obligatoria.' ]
    }
}, /*
    *El segundo argumento del esquema se agrega para acceder a una colección 
    *de MongoDB ya establecida.
    *De esta forma, se usa el nombre de dicha colección en lugar del nombre de la clase
    *con una s añadida.
    */
{
    collection: 'actividades'
} );

module.exports = model( 'Actividad', actividadeSchema );