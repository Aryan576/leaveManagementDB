const { Router } = require('express')
const express = require('express')
const router = express.Router()


const controller = require('../controller/users.controller')
router.post('/userSignup',controller.userSignup )
router.post('/userLogin',controller.userLogin)



module.exports=router