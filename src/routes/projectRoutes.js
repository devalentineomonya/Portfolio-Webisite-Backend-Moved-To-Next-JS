const express = require('express');
const projectRouter = express.Router();
const { listProjects, addProject, deleteProject, updateProject } = require('../controllers/projectControllers');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const { upload } = require('../middlewares/uploadMiddleware');

projectRouter
    .get("/list", listProjects)
    .post("/add", authMiddleware, isAdmin, upload, addProject)
    .put("/update/:id", authMiddleware, isAdmin, updateProject)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteProject);

module.exports = projectRouter;
