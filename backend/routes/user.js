const userController = require('../controller/user');
const express = require('express');
const router = express.Router();

router.post('/createUser',userController.createUser);
router.get('/getAllUser',userController.getAllUser);
router.delete('/deleteUser/:id',userController.deleteUser);
router.put('/updateUser/:id',userController.updateUser);
router.get('/getSingleUser',userController.getDataByQuerry);
router.put('/getUpdateUserByParams/:name',userController.getAndUpdateByParams);
router.post('/login',userController.loginSystem);


module.exports = router;