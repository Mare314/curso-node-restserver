const Arnes = require( '../models/arnes' );
const MO = require( '../models/mo' );
const Actividad = require( '../models/actividad' );
const Role = require( '../models/role' );
const Usuario = require( '../models/usuario' );
const Personal = require('../models/personal');
const Registro = require('../models/registro');

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

const personalIDExiste = async( id ) => {
    const existePersonal = await Personal.findById( id );

    if( !existePersonal ){
        throw new Error( `No existe personal con el ID ${ id }.` );
    }
}

const registroIDExiste = async( id ) => {
    const existeRegistro = await Registro.findById( id );

    if( !existeRegistro ){
        throw new Error( `No existe registro con el ID ${ id }.` );
    }
}

const personalExiste = async( personal = '' ) => {
    const existePersonal = await Personal.findOne( { personal } );

    if( !existePersonal ){
        throw new Error( `El operador ${ personal } no está registrado en la base de datos.` );
    }
}

const moExiste = async( mo = '' ) => {
    const existeMO = await MO.findOne( { mo } );

    if( !existeMO ){
        throw new Error( `La MO ${ mo } no está dada de alta en la base de datos.` );
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
    esActividadValida,
    personalIDExiste,
    registroIDExiste,
    personalExiste,
    moExiste
}