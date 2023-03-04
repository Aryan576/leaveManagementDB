const { Router } = require('express')
const express = require('express')
const router = express.Router()


 const controller = require('../controller/users.controller') 
  router.post('/userSignup',controller.userSignup )
router.post('/userLogin',controller.userLogin)
router.get('/userList',controller.userList)
router.get('/userById/:userid',controller.GetUserById)
router.put('/updateUser',controller.updateUser)
 router.delete('/deleteUser',controller.deleteUser)


module.exports=router