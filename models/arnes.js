const { Schema, model } = require( 'mongoose' );

const arnesSchema = Schema( {
    ARN: {
        type: String,
        required: [ true, 'El campo es obligatorio.' ]
    },
    cliente: {
        type: String,
        require: [ true, 'El cliente es obligatorio.']
    },
    estado: {
        type: Boolean,
        default: true
    }
} );

arnesSchema.methods.toJSON = function() {
    const { __v, _id, ...arnes } = this.toObject();
    arnes.uid = _id;
    return arnes;
}

module.exports = model( 'Arnes', arnesSchema );