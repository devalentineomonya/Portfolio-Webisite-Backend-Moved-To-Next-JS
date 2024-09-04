const stackModels = require('../models/stackModels');
const { stackSchema } = require('../validation/JoiSchemas');

const addStack = async (req, res) => {
    const { name, description, iconName } = req.body;
    try {
        await stackSchema.validateAsync({ name, description, iconName });
        const checkStack = await stackModels.find({ name: name })
        if (checkStack) return res.status(400).json({ success: false, message: "Tech Stack with the same name already exist" })

        const newStack = new stackModels({
            name,
            description,
            iconName
        });
        await newStack.save();
        res.status(201).json({ success: true, message: "Stack added successfully" });
    } catch (error) {
        if (error.isJoi) return res.status(422).json({ success: false, message: error.details[0].message });
        res.status(500).json({ success: false, message: "An error occurred while adding stack: ", error: error.message });
    }
};

const listStacks = async (req, res) => {
    const { limit } = req.query
    try {
        const intLimit = parseInt(limit)
        let stacks;
        if (!isNaN(intLimit)) {
            stacks = await stackModels.find().limit(intLimit);
        } else {

            stacks = await stackModels.find();
        }
      
        res.status(200).json({ success: true, count: stacks.length, data: stacks });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while listing stacks: ", error: error.message });
    }
};



const updateStack = async (req, res) => {
    const { id } = req.params;
    const { name, description, iconName } = req.body;

    try {
        const stack = await stackModels.findById(id);
        const checkStack = await stackModels.findOne({ name, _id: { $ne: id } });


        if (!stack) return res.status(404).json({ success: false, message: "Stack with the specified id was not found" });
        if (checkStack) return res.status(400).json({ success: false, message: "Tech Stack with the same name already exist" })

        const updatedStack = await stackModels.findByIdAndUpdate(id, {
            name,
            description,
            iconName
        }, { new: true });

        res.status(200).json({ success: true, message: "Stack updated successfully", data: updatedStack });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating stack: ", error: error.message });
    }
};

const deleteStack = async (req, res) => {
    const { id } = req.params;

    try {
        const stack = await stackModels.findById(id);
        if (!stack) return res.status(404).json({ success: false, message: "Stack with specified id was not found" });

        await stackModels.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Stack deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting stack: ", error: error.message });
    }
};

module.exports = { addStack, listStacks, updateStack, deleteStack };
