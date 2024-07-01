const express = require('express');
const testimonialsRouter = express.Router();
const {addTestimonial, listTestimonials, getTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialControllers')

const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const upload = require("../middlewares/uploadMiddleware");

testimonialsRouter
    .get("/list",listTestimonials)
    .get("/get/:id", authMiddleware, getTestimonial)
    .post("/add", authMiddleware, isAdmin, upload.upload.single("image"), addTestimonial)
    .put("/update/:id", authMiddleware, isAdmin, updateTestimonial)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteTestimonial);

module.exports = testimonialsRouter;
