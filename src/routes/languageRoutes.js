const express = require('express')
const { addLanguage, getLanguages } = require('../controllers/languageControllers')
const languagesRouter = express.Router()

 languagesRouter.post("/add", addLanguage)
 languagesRouter.get("/list", getLanguages)


 module.exports = languagesRouter