const { response, request } = require( 'express' );

const Registro = require( '../models/registro' );

const registroGet = async( req = request, res = response ) => {
    const { limite = 10, desde = 0 } = req.query;
    const queryActivos = { estado: true };

    const [ total, Registros ] = await Promise.all( [
        Registro.countDocuments( queryActivos ),
        Registro.find( queryActivos )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ] )

    res.json( {
        total, Registros
    } )
}

const registroPost = async( req, res = response ) => {
    const { nombre,
            actividad,
            arnes,
            cantidad,
            mo } = req.body
    const registro = new Registro( { nombre, actividad, arnes, cantidad, mo } );
    
    // Guardar en BD.
    await registro.save();

    res.json( registro );
}

const registroPut = async( req, res ) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const registro = await Registro.findByIdAndUpdate( id, resto );

    res.json( registro );
}

const registroDelete = async( req, res ) => {
    const { id } = req.params;
    const uid = req.uid;

    const registro = await Registro.findByIdAndUpdate( id, { estado: false } );

    res.json( registro );
}

module.exports = {
    registroGet,
    registroPost,
    registroPut,
    registroDelete
}