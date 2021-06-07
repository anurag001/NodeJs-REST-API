const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const validJWT = require('../middleware/validate');

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.post('/create', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/:page?', validJWT.validJWTNeeded, userController.getUserList);
router.delete('/:id', validJWT.validJWTNeeded, userController.deleteUser);

module.exports = router;