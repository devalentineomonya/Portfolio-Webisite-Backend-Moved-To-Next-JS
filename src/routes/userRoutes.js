const express = require('express')
const { addUser, deleteUser, updateUser, getUser, listUsers } = require("../controllers/userControllers")
const upload = require("../middlewares/uploadMiddleware")
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares')
const usersRouter = express.Router()



usersRouter.get("/list", authMiddleware, listUsers)
usersRouter.get("/get/:id", authMiddleware, getUser)
usersRouter.post("/add", authMiddleware, isAdmin, upload.upload.single("image"), addUser)
usersRouter.put("/update/:id", authMiddleware, isAdmin, updateUser)
usersRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteUser)

module.exports = usersRouter
