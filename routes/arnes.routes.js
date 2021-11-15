const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );

const { arnesIDExiste } = require( '../helpers/db-validators' );

const { arnesGet, arnesPost, arnesPut, arnesDelete } = require( '../controllers/arnes.controller' );

const router = Router();

router.get( '/', [
    validarCampos
], arnesGet );

router.put( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( arnesIDExiste ),
    validarCampos
], arnesPut );

router.post( '/', [
    check( 'ARN', 'El ARN es obligatorio.' ).not().isEmpty(),
    check( 'ARN', 'El ARN debe contener 10 caracteres' ).isLength( { min: 10 } ),
    check( 'cliente', 'El cliente es obligatorio.' ).not().isEmpty(),
    validarCampos
], arnesPost );

router.delete( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( arnesIDExiste ),
    validarCampos
], arnesDelete );

module.exports = router;