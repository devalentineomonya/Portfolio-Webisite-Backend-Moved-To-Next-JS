const jwt = require("jsonwebtoken")


const userToken = (id) => {
    const jwtSecrete = process.env.JWT_SECRET_STRING || 'jwtsuperstrongsecretstring'
    return jwt.sign({ id }, jwtSecrete)
}

module.exports = userToken