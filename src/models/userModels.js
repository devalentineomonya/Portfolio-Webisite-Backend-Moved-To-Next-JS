const mongoose = require("mongoose")

const user = {

    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    image: { type: String, required: true, },
    isAdmin: { type: Boolean, default: false, },
    password: { type: String, required: true }


}

const userSchema = mongoose.Schema(user)

module.exports = mongoose.models.users || mongoose.model("users", userSchema)