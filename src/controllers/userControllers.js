const userModels = require('../models/userModels')
const bcrypt = require('bcrypt')
const { unlink } = require('../middlewares/uploadMiddleware')


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
            return res.status(201).json({ success: true, message: "New user added successfully" })
        }
        unlink(image)
        res.status(400).json({ success: false, message: "User with this email id already exists" })

    } catch (error) {
        unlink(image)
        res.status(500).json({ success: false, message: "An error occurred while adding user =>" + error.message })
    }


}



const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModels.findById(id)
        if (user) {
            await userModels.findByIdAndDelete(id)
           return res.status(200).json({ success: true, message: "User has been deleted successfully" })
        }
        res.status(404).json({success: false, message: "User with the specified id was not found"})
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users " + error.message })
    }

}



const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModels.findById(id)
        if (user) {
            await userModels.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ success: true, message: 'User updated successfully' })
        }
        res.status(404).json({ success: false, message: 'User with specified if does not exist ' })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users " + error.message })
    }
}




const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModels.findById(id)
        if (user) {
            return res.status(200).json({ success: true, data: user })
        }
        res.status(404).json({ success: false, message: "No user with that ID exists" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users " + error.message })
    }
}


const listUsers = async (req, res) => {
    try {
        const users = await userModels.find()
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users " + error.message })
    }
}


module.exports = { addUser, deleteUser, updateUser, getUser, listUsers }