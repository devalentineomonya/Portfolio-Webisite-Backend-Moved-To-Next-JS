const express = require('express');
const  { addCollaborator, deleteCollaborator, updateCollaborator, listCollaborators } = require("../controllers/collaboratorControllers")

const collaboratorRoutes = express.Router();

collaboratorRoutes
.get("/list",listCollaborators)
.post("/add",addCollaborator)
.put("/update",updateCollaborator)
.delete("/delete",deleteCollaborator)


module.exports = collaboratorRoutes