const { response, request } = require( 'express' );

const Mo = require( '../models/mo' );

const moGet = async( req = request, res = response ) => {
    const { limite = 10, desde = 0 } = req.query;
    const queryActivos = { estado: true };

    const [ total, MOs ] = await Promise.all( [
        Mo.countDocuments( queryActivos ),
        Mo.find( queryActivos )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ] )

    res.json( {
        total, MOs
    } )
}

const moPost = async( req, res = response ) => {
    const { MO, cliente } = req.body
    const mo = new Mo( { MO, cliente } );
    
    // Guardar en BD.
    await mo.save();

    res.json( mo );
}

const moPut = async( req, res ) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const mo = await Mo.findByIdAndUpdate( id, resto );

    res.json( mo );
}

const moDelete = async( req, res ) => {
    const { id } = req.params;
    const uid = req.uid;

    const mo = await Mo.findByIdAndUpdate( id, { estado: false } );

    res.json( mo );
}

module.exports = {
    moGet,
    moPost,
    moPut,
    moDelete
}