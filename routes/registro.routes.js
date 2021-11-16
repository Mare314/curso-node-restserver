const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );

const { arnesExiste,
        registroIDExiste,
        personalExiste,
        esActividadValida,
        moExiste
     } = require( '../helpers/db-validators' );

const { registroGet, registroPost, registroPut, registroDelete } = require( '../controllers/registro.controller' );

const router = Router();

router.get( '/', [
    validarCampos
], registroGet );

router.put( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( registroIDExiste ),
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'nombre' ).custom( personalExiste ),
    check( 'actividad', 'La actividad es obligatoria' ).not().isEmpty(),
    check( 'actividad' ).custom( esActividadValida ),
    check( 'arnes', 'El arnes es obligatorio' ).not().isEmpty(),
    check( 'arnes' ).custom( arnesExiste ),
    check( 'cantidad', 'La cantidad es obligatoria' ).not().isEmpty(),
    check( 'mo', 'La MO es obligatoria' ).not().isEmpty(),
    check( 'mo' ).custom( moExiste ),
    validarCampos
], registroPut );

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'nombre' ).custom( personalExiste ),
    check( 'actividad', 'La actividad es obligatoria' ).not().isEmpty(),
    check( 'actividad' ).custom( esActividadValida ),
    check( 'arnes', 'El arnes es obligatorio' ).not().isEmpty(),
    check( 'arnes' ).custom( arnesExiste ),
    check( 'cantidad', 'La cantidad es obligatoria' ).not().isEmpty(),
    check( 'mo', 'La MO es obligatoria' ).not().isEmpty(),
    check( 'mo' ).custom( moExiste ),
    validarCampos
], registroPost );

router.delete( '/:id', [
    check( 'id', 'No es un id válido.' ).isMongoId(),
    check( 'id' ).custom( registroIDExiste ),
    validarCampos
], registroDelete );

module.exports = router;