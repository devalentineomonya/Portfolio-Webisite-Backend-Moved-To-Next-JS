const express = require('express');
const certificatesRouter = express.Router();
const { getCertificates, addCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateControllers');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddlewares');
const { upload } = require('../middlewares/uploadMiddleware');

certificatesRouter
    .get("/list", getCertificates)
    .post("/add", authMiddleware, isAdmin, upload, addCertificate)
    .put("/update/:id", authMiddleware, isAdmin, updateCertificate)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteCertificate);

module.exports = certificatesRouter;
