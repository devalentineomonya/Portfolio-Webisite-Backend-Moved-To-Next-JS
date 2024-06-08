const express = require('express')
const {addUser,deleteUser ,updateUser,getUser ,listUsers} = require("../controllers/userControllers")
const upload = require("../middlewares/uploadMiddleware")
const usersRouter = express.Router()

 

usersRouter.get("/list",listUsers)
usersRouter.get("/get", getUser)
usersRouter.post("/add",upload.upload.single("image"), addUser)
usersRouter.put("/update", updateUser)
usersRouter.delete("/delete", deleteUser)

module.exports  = usersRouter
