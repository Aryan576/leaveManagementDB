const { Router } = require('express')
const express = require('express')
const router = express.Router()


const controller = require('../controller/users.controller')
router.post('/userSignup',controller.userSignup )
router.post('/userLogin',controller.userLogin)
router.get('/userList',controller.usersList)
router.get('/userById/:userid',controller.GetUserById)
router.get('/updateUser',controller.userUpdate)



module.exports=router