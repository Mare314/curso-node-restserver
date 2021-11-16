const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );

const { personalIDExiste } = require('../helpers/db-validators');

const { personalGet, personalPost, personalPut, personalDelete } = require( '../controllers/personal.controller' );

const router = Router();

router.get( '/', [
    validarCampos
], personalGet );

router.put( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( personalIDExiste ),
    validarCampos
], personalPut );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    validarCampos
], personalPost );

router.delete( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( personalIDExiste ),
    validarCampos
], personalDelete );

module.exports = router;