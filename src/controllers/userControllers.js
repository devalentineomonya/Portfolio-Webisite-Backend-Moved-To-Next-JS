const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');
const { unlink } = require('../middlewares/uploadMiddleware');
const { userSchema } = require('../validation/JoiSchemas');

const addUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        await userSchema.validateAsync({ firstName, lastName, email, password });

        const hashedPassword = await bcrypt.hash(password, 15);
        const checkUser = await userModels.findOne({ email });

        if (!checkUser) {
            const newUser = new userModels({
                firstName,
                lastName,
                email,
                image,
                password: hashedPassword
            });

            await newUser.save();
            return res.status(201).json({ success: true, message: "New user added successfully" });
        }

        if (image) {
            unlink(image);
        }

        res.status(400).json({ success: false, message: "User with this email already exists" });
    } catch (error) {
        if (image) {
            unlink(image);
        }
        if (error.isJoi) {
            // Joi validation error
            return res.status(422).json({ success: false, message: error.details[0].message });
        }
        res.status(500).json({ success: false, message: "An error occurred while adding user: ", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.currentUserId;

    try {
        if (id !== currentUserId) {
            const user = await userModels.findById(id);

            if (user) {
                unlink(user.image);
                await userModels.findByIdAndDelete(id);
                return res.status(200).json({ success: true, message: "User deleted successfully" });
            }

            return res.status(404).json({ success: false, message: "User with the specified id was not found" });
        }

        res.status(400).json({ success: false, message: "Cannot delete current user" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting user: ", error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModels.findById(id);

        if (user) {
            const updatedUser = await userModels.findByIdAndUpdate(id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }, { new: true });

            return res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
        }
        res.status(404).json({ success: false, message: "User with specified id does not exist" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating user: ", error: error.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModels.findById(id);
        if (user) {
            return res.status(200).json({ success: true, data: user });
        }
        res.status(404).json({ success: false, message: "User with specified id does not exist" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching user: ", error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userModels.find();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching users: ", error: error.message });
    }
};

module.exports = { addUser, deleteUser, updateUser, getUser, listUsers };
