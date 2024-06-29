const express = require('express');
const partnersRouter = express.Router();
const { getPartners, addPartner, updatePartner, deletePartner } = require('../controllers/partnerControllers');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddlewares');
const { upload } = require('../middlewares/uploadMiddleware');

partnersRouter
    .get("/list", getPartners)
    .post("/add", authMiddleware, isAdmin, upload.single("image"), addPartner)
    .put("/update/:id", authMiddleware, isAdmin, updatePartner)
    .delete("/delete/:id", authMiddleware, isAdmin, deletePartner);

module.exports = partnersRouter;
