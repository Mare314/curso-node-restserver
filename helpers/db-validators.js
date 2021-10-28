const Role = require( '../models/role' );
const Usuario = require( '../models/usuario' );

const esRolValido = async( rol = '' ) => {
    const existeRol = await Role.findOne( { rol } );
    if( !existeRol ){
            throw new Error( `El rol ${ rol } no está registrado en la base de datos.` );
    }
}

const correoExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );

    if( existeEmail ){
        throw new Error( `El correo ${ correo } ya está en uso.` );
    }
}

const usuarioIDExiste = async( id ) => {
    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ){
        throw new Error( `No existe un usuario con el ID ${ id }.` );
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioIDExiste
}