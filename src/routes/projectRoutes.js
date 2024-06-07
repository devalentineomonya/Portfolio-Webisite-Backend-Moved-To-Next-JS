const express = require('express');
const { listProjects, addProject, deleteProject, updateProject } = require('../controllers/projectControllers');
const projectRouter = express.Router();

projectRouter.get("list", listProjects)

projectRouter.post("/add", addProject)

projectRouter.put("/update", updateProject)

projectRouter.delete("/delete", deleteProject)

module.exports = projectRouter