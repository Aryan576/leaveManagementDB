const { Router } = require('express')
const express = require('express')
const router = express.Router()

const controller= require('../controller/students.controller')

router.post('/addStudents',controller.addStudent)
router.post('/studentsLogin',controller.studentLogin)
router.get('/getStudent',controller.getStudentList)
router.get('/getStudentById/:studentid',controller.getStudentById)



module.exports = router