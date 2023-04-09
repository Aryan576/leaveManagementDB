const { Router } = require('express')
const express = require('express')
const router = express.Router()


 const controller = require('../controller/leave.controller') 
  router.post('/addleave',controller.addLeave )
  router.get('/getmcastudetns',controller.getmcastudent)
  router.put('/getmcastudetnapproved',controller.acceptStudent)
  router.put('/getmcastudentreject',controller.rejectStudent)
  router.get('/getmcastudentapproved',controller.getmcastudentapproved)
  router.get('/getmcastudentreject',controller.getmcastudentreject)
/* router.post('/getleave',controller.userLogin)
router.get('/userList',controller.userList)
router.get('/userById/:userid',controller.GetUserById)
router.put('/updateUser',controller.updateUser)
 router.delete('/deleteUser',controller.deleteUser) */


module.exports=router