const userModels = require("../models/userModels");
const bcrypt = require("bcrypt");
const userToken = require("../config/userToken");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Wrong username or password" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ success: false, message: "Wrong username or password" });
        }

        const token = userToken(user._id);
        return res.status(200).json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: `An error occurred while authenticating user: ${error.message}` });
    }
};

module.exports = { login };
