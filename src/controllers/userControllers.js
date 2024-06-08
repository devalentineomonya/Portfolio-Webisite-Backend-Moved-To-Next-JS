const userModels = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userToken = (id) => {
    const jwtSecrete = process.env.JWT_SECRET_STRING || 'jwtsuperstrongsecretstring'
    return jwt.sign({ id }, jwtSecrete)
}



const addUser = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const image = req.file.filename
    const password = req.body.password
    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        const checkUser = await userModels.findOne({ email })
        if (!checkUser) {
            const newUser = new userModels({
                name: name,
                email: email,
                image: image,
                password: hashedPassword
            })
            await newUser.save()
            const token = userToken(newUser._id)

            return res.status(201).json({ success: true, message: "New user added successfully", token })
        }
        
        res.status(400).json({ success: false, message: "User with this email id already exists" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding user =>" + error.message })
    }


}


const deleteUser = (req, res) => { }


const updateUser = (req, res) => { }


const getUser = (req, res) => { }


const listUsers = (req, res) => { }


module.exports = { addUser, deleteUser, updateUser, getUser, listUsers }