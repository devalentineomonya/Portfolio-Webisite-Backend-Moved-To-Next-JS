const skillModels = require('../models/skillModels');
const { skillSchema } = require('../validation/JoiSchemas');

const addSkill = async (req, res) => {
    const { name, description, iconsImport, iconComponent } = req.body;
    try {
        await skillSchema.validateAsync({ name, description, iconsImport, iconComponent });
        const newSkill = new skillModels({
            name,
            description,
            iconsImport,
            iconComponent
        });
        await newSkill.save();
        res.status(201).json({ success: true, message: "Skill added successfully" });
    } catch (error) {
        if (error.isJoi) {
            // Joi validation error
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        res.status(500).json({ success: false, message: "An error occurred while adding skill: " + error.message });
    }
};

const listSkills = async (req, res) => {
    try {
        const skills = await skillModels.find();
        res.status(200).json({ success: true, count:skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while listing skills: " + error.message });
    }
};



const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, description, iconsImport, iconComponent } = req.body;

    try {
        const skill = await skillModels.findById(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill with the specified id was not found" });
        }

        const updatedSkill = await skillModels.findByIdAndUpdate(id, {
            name,
            description,
            iconsImport,
            iconComponent
        }, { new: true });

        res.status(200).json({ success: true, message: "Skill updated successfully", data: updatedSkill });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating skill: " + error.message });
    }
};

const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await skillModels.findById(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill with specified id was not found" });
        }

        await skillModels.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting skill: " + error.message });
    }
};

module.exports = { addSkill, listSkills, updateSkill, deleteSkill };
