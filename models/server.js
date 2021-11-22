const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath =     '/api/auth';
        this.arnesesPath =  '/api/arneses';
        this.moPath =       '/api/mo';
        this.personalPath = '/api/personal';
        this.registroPath = '/api/registro';

        // Conectar a base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        // const origen = '*';
        // const origen = 'localhost:8100/';
        const origen = 'https://gollet-electronics.herokuapp.com/*';
        this.app.use( cors( {
            "origin": origen,
            "methods": "GET,PUT,POST,DELETE"
        } ) );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio público
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        this.app.use( this.usuariosPath, require( '../routes/usuarios.routes' ) );
        this.app.use( this.authPath, require( '../routes/auth.routes' ) );
        this.app.use( this.arnesesPath, require( '../routes/arnes.routes' ) );
        this.app.use( this.moPath, require( '../routes/mo.routes' ) );
        this.app.use( this.personalPath, require( '../routes/personal.routes' ) );
        this.app.use( this.registroPath, require( '../routes/registro.routes' ) );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        } );
    }
}

module.exports = Server;