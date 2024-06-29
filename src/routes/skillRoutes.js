const express = require('express');
const skillsRouter = express.Router();
const { addSkill, listSkills, updateSkill, deleteSkill } = require("../controllers/skillControllers");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');

skillsRouter
    .get("/list", listSkills)
    .post("/add", authMiddleware, isAdmin, addSkill)
    .put("/update/:id", authMiddleware, isAdmin, updateSkill)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteSkill);

module.exports = skillsRouter;
