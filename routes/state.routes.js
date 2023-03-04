const { Router } = require('express')
const express = require('express')
const router = express.Router()

const controller = require('../controller/state.controller')

router.post('addstate',controller.addState)


module.exports =router