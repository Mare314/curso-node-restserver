const  mongoose = require( 'mongoose' );

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } );
        
        console.log( 'Conexión exitosa con base de datos.' );
    } catch ( e ) {
        console.log( e );
        throw new Error( 'Error al conectar con la base de datos.' );
    }
}

module.exports = {
    dbConnection
}