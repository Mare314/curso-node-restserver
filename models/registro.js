const { Schema, model } = require( 'mongoose' );

const registroSchema = Schema( {
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    actividad: {
        type: String,
        required: [ true, 'La actividad es obligatoria.' ]
    },
    arnes: {
        type: String,
        required: [ true, 'El arnes es obligatorio.' ]
    },
    cantidad: {
        type: Number,
        required: [ true, 'La cantidad es obligatoria.']
    },
    mo: {
        type: Number,
        required: [ true, 'La MO es obligatoria.' ]
    },
    fecha: {
        type: Date, default: Date.now
    },
    inicio: {
        type: String
    },
    fin: {
        type: String
    }
} );

registroSchema.methods.toJSON = function(){
    const { __v, _id, ...registro } = this.toObject();
    registro.uid = _id;
    return registro;
}

module.exports = model( 'Registro', registroSchema );