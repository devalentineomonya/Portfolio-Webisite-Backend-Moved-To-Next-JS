const userModels = require("../models/userModels")
const bcrypt = require("bcrypt")
const userToken = require("../config/userToken")





const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await userModels.findOne({email })
        const isValid = await bcrypt.compare(password, user ? user.password : "")
        if (user && isValid) {
            const token = userToken(user._id)
            return res.status(200).json({ success: true, message: "Logged in successfully" , token})
        }

        res.status(400).json({ success: false, message: "Wrong username or password" })
    } catch (error) {

        res.status(500).json({ success: false, message: `An error occurred while authenticating user ${error.message}` })
    }

}

module.exports = {login}