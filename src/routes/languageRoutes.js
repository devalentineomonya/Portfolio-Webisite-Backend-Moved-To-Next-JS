const express = require('express')
const { addLanguage, getLanguages, updateLanguage } = require('../controllers/languageControllers')
const languagesRouter = express.Router()

 languagesRouter.post("/add", addLanguage)
 languagesRouter.get("/list", getLanguages)
 languagesRouter.put("/update", updateLanguage)


 module.exports = languagesRouter