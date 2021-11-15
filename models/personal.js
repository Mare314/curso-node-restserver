const { Schema, model } = require( 'mongoose' );

const personalSchema = Schema( {
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
    }
} );

personalSchema.methods.toJSON = function(){
    const { __v, _id, ...personal } = this.toObject();
    personal.uid = _id;
    return personal;
}

module.exports = model( 'Personal', personalSchema );