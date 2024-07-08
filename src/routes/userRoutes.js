const express = require('express');
const usersRouter = express.Router();
const { addUser, deleteUser, updateUser, getUser, listUsers } = require("../controllers/userControllers");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const {upload} = require("../middlewares/uploadMiddleware");

usersRouter
    .get("/list", authMiddleware, listUsers)
    .get("/get/:id", authMiddleware, getUser)
    .post("/add", authMiddleware, isAdmin, upload, addUser)
    .put("/update/:id", authMiddleware, isAdmin, updateUser)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

module.exports = usersRouter;
