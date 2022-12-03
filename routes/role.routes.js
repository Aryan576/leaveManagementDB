const express = require('express')
const router = express.Router()

const controller = require('../controller/role.controller')

router.post('/addRole',controller.addRole)
router.get('/getRoles',controller.getRoles)
router.get('/getRolesByID/:roleid',controller.getRolesByID)

module.exports=router