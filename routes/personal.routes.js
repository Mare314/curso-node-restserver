const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );

const { moIDExiste, clienteExiste, arnesExiste } = require( '../helpers/db-validators' );

const { moGet, moPost, moPut, moDelete } = require( '../controllers/mo.controller' );

const router = Router();

router.get( '/', [
    validarCampos
], moGet );

router.put( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( moIDExiste ),
    validarCampos
], moPut );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
    validarCampos
], moPost );

router.delete( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( moIDExiste ),
    validarCampos
], moDelete );

module.exports = router;