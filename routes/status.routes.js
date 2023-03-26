const { Router } = require('express')
const express = require('express')
const router = express.Router()

const controller = require('../controller/status.controller')
router.post('/addStatus',controller.addStatus)
router.get('/getStatus',controller.getStatus)
 router.get('/getStatus/:statusid',controller.getStatusById)
router.put('/updateStatus',controller.updateStatus)
router.delete('/deleteStatus',controller.deleteStatus)


module.exports=router