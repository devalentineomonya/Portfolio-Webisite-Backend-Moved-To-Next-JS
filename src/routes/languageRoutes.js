const express = require('express');
const { addLanguage, getLanguages, updateLanguage, deleteLanguage } = require('../controllers/languageControllers');

const languagesRouter = express.Router();

languagesRouter.route('/')
    .post(addLanguage)
    .get(getLanguages)
    .put(updateLanguage)
    .delete(deleteLanguage);

module.exports = languagesRouter;
