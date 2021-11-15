const { response, request } = require('express');
const jwt = require( 'jsonwebtoken' );
const usuario = require('../models/usuario');

const validarJWT = ( req = request, res = response, next ) => {
    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status( 401 ).json( {
            msg: 'No hay token en la petición.'
        } );
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        /* Se crea una propiedad nueva llamada uid para mostrar el uid del usuario.
        *  También es posible sobreescribir los headers mediante esta función del express.
        */
        req.uid = uid;

        next();
    } 
    catch ( error ) {
        console.log( error );
        res.status( 401 ).json( {
            msg: 'Token no válido.'
        } );
    }

    console.log( token );

    next();
}

module.exports = {
    validarJWT
}