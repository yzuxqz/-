const express = require('express')

const personalInfo = express.Router()

personalInfo.post('/updatePersonalInfo',require('./personalInfo/update-personal-info'))

module.exports=personalInfo