const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/city.controller')

router.post('addcity',controller.addCity)


module.exports =router