const express = require('express');
const stacksRouter = express.Router();
const { addStack, listStacks, updateStack, deleteStack } = require("../controllers/stackControllers");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');

stacksRouter
    .get("/list", listStacks)
    .post("/add", authMiddleware, isAdmin, addStack)
    .put("/update/:id", authMiddleware, isAdmin, updateStack)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteStack);

module.exports = stacksRouter;
