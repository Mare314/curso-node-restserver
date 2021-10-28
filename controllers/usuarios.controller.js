const { response, request } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );
const { discriminators } = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async( req = request, res = response ) => {
    // const { q, nombre = 'Nameless', edad, page = 1, limit } = req.query;
    // TODO validar que los parámetros sean números.
    const { limite = 4, desde = 0 } = req.query;
    const queryActivos = { estado: true };
    // const usuarios = await Usuario.find( queryActivos )
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) );

    // const total = await Usuario.countDocuments( queryActivos );

    const [ total, usuarios ] = await Promise.all( [
        Usuario.countDocuments( queryActivos ),
        Usuario.find( queryActivos )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ] )

    res.json( {
        total,
        // msg: 'get API - controlador',
        // // query
        // q,
        // nombre,
        // edad,
        // page,
        // limit
        usuarios
        // resp
    } );
}

const usuariosPost = async( req, res = response ) => {
    // const body = req.body;
    /* Se puede excluir un solo argumento en la desestructuración 
    * para trabajar con el retso de elementos mediante el siguiente operador.
    * En este ejemplo, se excluye "google" y al arreglo con los demás elementos se le da
    * el nombre de "resto".
    */
    // const { google, ...resto } = req.body
    const { nombre, correo, password, rol } = req.body
    // const usuario = new Usuario( body );
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Verificar si el correo existe. (se movio a los helpers de la base de datos)
    

    // Encriptar la contraseña (hash). 
        /*A mayor número, mayor seguridad pero mayor tiempo de espera. 
        * El número de vueltas por defecto es 10.
        */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    // Guardar en BD.
    await usuario.save();

    res.json( usuario );
}

const usuariosPut = async( req, res ) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO Validar contra base de datos.
    if( password ){
        // Encriptar la contraseña,
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
}

const usuariosPatch = ( req, res ) => {
    res.json( {
        msg: 'patch API - controlador'
    } );
}

const usuariosDelete = async( req, res ) => {
    const { id } = req.params;

    // Eliminiación física.
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Eliminación lógica.
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json( usuario );
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}