const express = require('express');
const { addLanguage, getLanguages, updateLanguage, deleteLanguage } = require('../controllers/languageControllers');

const languagesRouter = express.Router();

languagesRouter
    .post("/add",addLanguage)
    .get("/list",getLanguages)
    .put("/update",updateLanguage)
    .delete("/delete",deleteLanguage);

module.exports = languagesRouter;
