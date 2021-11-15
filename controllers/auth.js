const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req, res = response ) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el correo existe.
        const usuario = await Usuario.findOne( { correo } );

        if ( !usuario ) {
            return res.status( 400 ).json( {
                msj: 'Usuario o contraseña no es correcto.'
            } );
        }

        // Verificar si el usuario está activo en la base de datos.
        if ( !usuario.estado ) {
            return res.status( 400 ).json( {
                msj: 'Usuario o contraseña no es correcto.'
            } );
        }

        // Verificar la contraseña.
        const passwordValida = bcryptjs.compareSync( password, usuario.password );
        if ( !passwordValida ) {
            return res.status( 400 ).json( {
                msj: 'Usuario o contraseña no es correcto.'
            } );
        }

        // Generar JSON Web Token.
        const token = await generarJWT( usuario.id );

        res.json( {
            usuario,
            token
        } );        
    } 
    catch (error) {
        console.log( error );
        return res.status( 500 ).json( {
            msj: 'Hable con el administrador.'
        } );
    }

}

module.exports = {
    login
}