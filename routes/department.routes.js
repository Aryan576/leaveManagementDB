const { Router } = require('express')
const express = require('express')
const router = express.Router()

const controller = require('../controller/department.controller')
router.post('/addDepartment',controller.addDepartment)
router.get('/getDepartment',controller.getDepartment)
 router.get('/getDepartmentById/:deptid',controller.getDepartmentById)
router.put('/updateDepartment',controller.updateDepartment)
router.delete('/deleteDepartment',controller.deleteDepartment)


module.exports=router