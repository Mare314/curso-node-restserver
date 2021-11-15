const { Schema, model } = require( 'mongoose' );

const moSchema = Schema( {
    MO: {
        type: Number,
        required: [ true, 'El campo es obligatorio.' ]
    },
    arnes: {
        type: String,
        required: [ true, 'El arnes es obligatorio.']
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

moSchema.methods.toJSON = function() {
    const { __v, _id, ...mo } = this.toObject();
    mo.uid = _id;
    return mo;
}

module.exports = model( 'MO', moSchema );