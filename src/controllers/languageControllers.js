const languageModel = require('../models/languageModels');
const { languageSchema } = require('../validation/JoiSchemas');
const addLanguage = async (req, res) => {
    try {
        const { name, percentage } = req.body;
        const validatedData = await languageSchema.validateAsync({ name, percentage });
        const checkLanguage = await languageModel.findOne({ name });
        if (checkLanguage) return res.status(400).json({ success: false, message: "This language already exists in your database" });
        
        const language = new languageModel(validatedData);
        await language.save();

        res.status(201).json({ success: true, message: "Language added successfully", data: language });
    } catch (error) {
        if (Joi.isError(error)) {
            return res.status(422).json({ success: false, message: error.details[0].message });
        }
        res.status(500).json({ success: false, message: "An error occurred while adding language" });
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, percentage } = req.body;
        
        const checkLanguage = await languageModel.findOne({ name });
        if (checkLanguage?._id.toString() !== id) {
            return res.status(400).json({ success: false, message: "Language with this name already exists" });
        }

        const updatedLanguage = await languageModel.findByIdAndUpdate(id, { name, percentage }, { new: true });
        
        if (!updatedLanguage) {
            return res.status(404).json({ success: false, message: "Language with the specified id was not found" });
        }

        res.status(200).json({ success: true, message: "Language updated successfully", data: updatedLanguage });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating language" });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const languageToDelete = await languageModel.findById(id);
        if (!languageToDelete) {
            return res.status(404).json({ success: false, message: "Language with the specified id does not exist" });
        }

        await languageModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Language has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting language" });
    }
};

const getLanguages = async (req, res) => {
    try {
        const languages = await languageModel.find();
        res.status(200).json({ success: true,count:languages.length, data: languages });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching languages" });
    }
};

module.exports = { getLanguages, addLanguage, updateLanguage, deleteLanguage };
