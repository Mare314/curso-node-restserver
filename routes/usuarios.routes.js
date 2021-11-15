const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRolValido, 
        correoExiste, 
        usuarioIDExiste } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        // usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios.controller');

const router = Router();


router.get( '/', [
        // check( 'desde', 'El valor debe ser numérico.' ).not().isString(),
        // check( 'limite', 'El valor debe ser numérico.' ).not().isString(),
        validarCampos
], usuariosGet );

router.put( '/:id', [
        check( 'id', 'No es un id válido.' ).isMongoId(),
        check( 'id' ).custom( usuarioIDExiste ),
        check( 'rol' ).custom( esRolValido ),
        validarCampos
], usuariosPut );

router.post( '/', [
        check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
        check( 'password', 'La contraseña es obligatoria y debe contener más de 6 caracteres.' ).isLength( { min: 6 } ),
        check( 'correo', 'El correo recibido no tiene un formato válido.' ).isEmail(),
        check( 'correo' ).custom( correoExiste ),
        // check( 'rol', 'El rol recibido no es un rol válido.' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        check( 'rol' ).custom( esRolValido ),
        validarCampos
], usuariosPost );

// router.patch( '/', usuariosPatch );

router.delete( '/:id', [
        validarJWT,
        check( 'id', 'No es un id válido.' ).isMongoId(),
        check( 'id' ).custom( usuarioIDExiste ),
        validarCampos
], usuariosDelete );

module.exports = router;