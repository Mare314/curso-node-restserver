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
    check( 'cliente', 'El cliente es obligatorio.' ).not().isEmpty(),
    check( 'cliente' ).custom( clienteExiste ),
    check( 'arnes', 'El arnes es obligatorio.' ).not().isEmpty(),
    check( 'arnes' ).custom( arnesExiste ),
    validarCampos
], moPut );

router.post( '/', [
    check( 'MO', 'La MO es obligatoria.' ).not().isEmpty(),
    // check( 'MO', 'La MO debe contener 10 caracteres' ).isLength( { min: 10 } ),
    check( 'cliente', 'El cliente es obligatorio.' ).not().isEmpty(),
    check( 'cliente' ).custom( clienteExiste ),
    check( 'arnes', 'El arnes es obligatorio.' ).not().isEmpty(),
    check( 'arnes' ).custom( arnesExiste ),
    validarCampos
], moPost );

router.delete( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( moIDExiste ),
    validarCampos
], moDelete );

module.exports = router;