const { Schema, model } = require( 'mongoose' );

const actividadSchema = Schema( {
    actividad:{
        type: String,
        required: [ true, 'La actividad es obligatoria.' ]
    }
} );

module.exports = model( 'Role', actividadSchema );