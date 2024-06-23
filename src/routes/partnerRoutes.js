const express = require('express');
const { getPartners, addPartner, updatePartner, deletePartner } = require('../controllers/partnerControllers');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddlewares');
const { upload } = require('../middlewares/uploadMiddleware');
const partnersRouter = express.Router();

partnersRouter.get("/list",getPartners)
partnersRouter.post("/add",authMiddleware, isAdmin, upload.single("image"), addPartner)
partnersRouter.put("/update/:id",authMiddleware, isAdmin,  updatePartner)
partnersRouter.delete("/delete/:id",authMiddleware, isAdmin,  deletePartner)

module.exports = partnersRouter