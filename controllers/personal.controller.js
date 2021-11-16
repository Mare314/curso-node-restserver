const { response, request } = require( 'express' );

const Personal = require( '../models/personal' );

const personalGet = async( req = request, res = response ) => {
    const { limite = 10, desde = 0 } = req.query;
    const queryActivos = { estado: true };

    const [ total, personal ] = await Promise.all( [
        Personal.countDocuments( queryActivos ),
        Personal.find( queryActivos )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ] )

    res.json( {
        total, personal
    } )
}

const personalPost = async( req, res = response ) => {
    const { nombre } = req.body
    const personal = new Personal( { nombre } );
    
    // Guardar en BD.
    await personal.save();

    res.json( personal );
}

const personalPut = async( req, res ) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const personal = await Personal.findByIdAndUpdate( id, resto );

    res.json( personal );
}

const personalDelete = async( req, res ) => {
    const { id } = req.params;
    const uid = req.uid;

    const personal = await Personal.findByIdAndUpdate( id, { estado: false } );

    res.json( personal );
}

module.exports = {
    personalGet,
    personalPost,
    personalPut,
    personalDelete
}