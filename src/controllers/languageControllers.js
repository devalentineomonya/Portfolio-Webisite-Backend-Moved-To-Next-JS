const languageModel = require('../models/languageModels')


const addLanguage = async (req, res) => {
    try {
        const { name, percentage } = req.body
        const checkLanguage = await languageModel.findOne({ name: name })
        if (checkLanguage) return res.status(400).json({ success: false, message: "This language already exists in your database" })
        const language = new languageModel({
            name: name,
            percentage: percentage
        })
        await language.save()
        res.status(201).json({ success: true, message: "Language added successfully" })


    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding language" })
    }
}



const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params
        const { name, percentage } = req.body
        const checkLanguage = await languageModel.findOne({ name: name })
        const languageToUpdate = await languageModel.findById(id);
        if (languageToUpdate) {
            if (checkLanguage) return res.status(400).json({ success: false, message: "Language with this name already exists" })
            await languageModel.findOneAndUpdate(id, { name: name, percentage: percentage }, { new: true })
            return res.status(200).json({ success: true, message: "Language updated successfully" })
        }
        res.status(404).json({ success: false, message: "Language with the specified id was not found" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating language" })
    }

}

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params
        const languageToDelete = languageModel.findById(id)
        if (!languageToDelete) return res.status(404).json({ success: false, message: "Language with the specified id does not exist" })
        await languageModel.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Language has been deleted successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting language" })
    }
}


const getLanguages = async (req, res) => {
    try {
        const languages = await languageModel.find()
        res.status(200).json({ success: true, data: languages })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching languages" })
    }

}


module.exports = { getLanguages, addLanguage, updateLanguage , deleteLanguage}