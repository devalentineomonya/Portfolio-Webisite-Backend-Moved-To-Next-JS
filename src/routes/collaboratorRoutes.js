const express = require('express');
const  { addCollaborator, deleteCollaborator, updateCollaborator, listCollaborators } = require("../controllers/collaboratorControllers");
const { isAdmin, authMiddleware} = require('../middlewares/authMiddlewares');

const collaboratorRoutes = express.Router();

collaboratorRoutes
.get("/list",listCollaborators)
.post("/add", authMiddleware, isAdmin,addCollaborator)
.put("/update", authMiddleware, isAdmin,updateCollaborator)
.delete("/delete", authMiddleware, isAdmin,deleteCollaborator)


module.exports = collaboratorRoutes