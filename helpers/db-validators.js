const Arnes = require( '../models/arnes' );
const MO = require( '../models/mo' );
const Actividad = require( '../models/actividad' );
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

const arnesIDExiste = async( id ) => {
    const existeArnes = await Arnes.findById( id );

    if( !existeArnes ){
        throw new Error( `No existe un arnes con el ID ${ id }.` );
    }
}

const moIDExiste = async( id ) => {
    const existeMo = await MO.findById( id );

    if( !existeMo ){
        throw new Error( `No existe un arnes con el ID ${ id }.` );
    }
}

const clienteExiste = async( cliente = '' ) => {
    const existeCliente = await Arnes.findOne( { cliente } );

    if( !existeCliente ){
            throw new Error( `El cliente ${ cliente } no está registrado en la base de datos.` );
    }
}

const arnesExiste = async( ARN = '' ) => {
    const existeArnes = await Arnes.findOne( { ARN } );

    if( !existeArnes ){
        throw new Error( `El arnes ${ ARN } no está registrado en la base de datos.` )
    }
}

const esActividadValida = async( actividad = '' ) => {
    const existeActividad = await Actividad.findOne( { actividad } );
    if( !existeActividad ){
            throw new Error( `La actividad ${ actividad } no está registrada en la base de datos.` );
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioIDExiste,
    arnesIDExiste,
    moIDExiste,
    clienteExiste,
    arnesExiste,
    esActividadValida
}