const express = require('express')
const { addLanguage, getLanguages, updateLanguage, deleteLanguage } = require('../controllers/languageControllers')
const languagesRouter = express.Router()

 languagesRouter.post("/add", addLanguage)
 languagesRouter.get("/list", getLanguages)
 languagesRouter.put("/update", updateLanguage)
 languagesRouter.delete("/delete", deleteLanguage)


 module.exports = languagesRouter