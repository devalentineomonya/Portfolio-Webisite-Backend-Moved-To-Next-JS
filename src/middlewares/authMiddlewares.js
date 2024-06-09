const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');

const authMiddleware = async (req, res, next) => {
    const bearerToken = req?.headers?.authorization || ""
    try {
        if (bearerToken && bearerToken.startsWith("Bearer")) {
            const token = bearerToken.split(" ")[1]
            const jwtSecrete = process.env.JWT_SECRET_STRING || 'jwtsuperstrongsecretstring'
            const decodedToken = jwt.verify(token, jwtSecrete)
            const user = await userModels.findOne({ _id: decodedToken.id })
            req.user = user
            next()
            return
        }
        res.status(401).json({ success: false, message: "User token is expired or invalid, be sure to provide the correct token" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error ocurred while verifying user=>" + error.message })
    }
}



const isAdmin = (req, res, next) => {
    const user = req.user
    const isAdmin = user.isAdmin
    if (isAdmin) {
        next()
        return
    }
    res.status(401).json({ success: false, message: "You don & t have the admin privileges to perform this action" })
}




module.exports = { authMiddleware, isAdmin }