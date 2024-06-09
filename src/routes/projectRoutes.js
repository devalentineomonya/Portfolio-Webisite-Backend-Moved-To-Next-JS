const express = require('express');
const { listProjects, addProject, deleteProject, updateProject } = require('../controllers/projectControllers');
const projectRouter = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const { upload } = require('../middlewares/uploadMiddleware');

projectRouter.get("/list", listProjects)

projectRouter.post("/add", authMiddleware, isAdmin,upload.single("image"), addProject)

projectRouter.put("/update/:id", authMiddleware, isAdmin, updateProject)

projectRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteProject)

module.exports = projectRouter