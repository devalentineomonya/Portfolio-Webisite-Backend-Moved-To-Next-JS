const {login} = require('../controllers/authControllers')
const express = require('express')

const authRouter = express.Router()

authRouter.post("/login", login)

module.exports = authRouter