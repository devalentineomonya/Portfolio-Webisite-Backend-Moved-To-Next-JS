const userModels = require('../models/userModels')
const bcrypt = require('bcrypt')
const { unlink } = require('../middlewares/uploadMiddleware')


const addUser = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const image = req.file.filename
    const password = req.body.password
    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        const checkUser = await userModels.findOne({ email })
        if (!checkUser) {
            const newUser = new userModels({
                firstName,
                lastName,
                email,
                image,
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
    const currentUserId = req.currentUserId
    try {
        if (id !== currentUserId) {
            const user = await userModels.findById(id)
            if (user) {
                unlink(user.image)
                await userModels.findByIdAndDelete(id)
                return res.status(200).json({ success: true, message: "User has been deleted successfully" })
            }
            return res.status(404).json({ success: false, message: "User with the specified id was not found" })
        }
        res.status(400).json({ success: false, message: "Current user cant be deleted" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users " + error.message })
    }

}



const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModels.findById(id)
        if (user) {
            const updateUser = await userModels.findByIdAndUpdate(id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            },
                {
                    new: true
                })

            return res.status(200).json({ success: true, message: 'User updated successfully', data: updateUser })
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