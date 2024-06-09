const express = require('express')
const { addUser, deleteUser, updateUser, getUser, listUsers } = require("../controllers/userControllers")
const upload = require("../middlewares/uploadMiddleware")
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares')
const usersRouter = express.Router()



usersRouter.get("/list", authMiddleware, listUsers)
usersRouter.get("/get", authMiddleware, getUser)
usersRouter.post("/add", authMiddleware, isAdmin, upload.upload.single("image"), addUser)
usersRouter.put("/update", authMiddleware, isAdmin, updateUser)
usersRouter.delete("/delete", authMiddleware, isAdmin, deleteUser)

module.exports = usersRouter
