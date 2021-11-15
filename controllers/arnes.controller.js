const { response, request } = require( 'express' );

const Arnes = require( '../models/arnes' );

const arnesGet = async( req = request, res = response ) => {
    const { limite = 10, desde = 0 } = req.query;
    const queryActivos = { estado: true };

    const [ total, arneses ] = await Promise.all( [
        Arnes.countDocuments( queryActivos ),
        Arnes.find( queryActivos )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ] )

    res.json( {
        total, arneses
    } )
}

const arnesPost = async( req, res = response ) => {
    const { ARN, cliente } = req.body
    const arnes = new Arnes( { ARN, cliente } );
    
    // Guardar en BD.
    await arnes.save();

    res.json( arnes );
}

const arnesPut = async( req, res ) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const arnes = await Arnes.findByIdAndUpdate( id, resto );

    res.json( arnes );
}

const arnesDelete = async( req, res ) => {
    const { id } = req.params;
    const uid = req.uid;

    const arnes = await Arnes.findByIdAndUpdate( id, { estado: false } );

    res.json( arnes );
}

module.exports = {
    arnesGet,
    arnesPost,
    arnesPut,
    arnesDelete
}