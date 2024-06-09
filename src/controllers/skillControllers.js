const skillModels = require('../models/skillModels')
const userModels = require('../models/userModels')


const addSkill = async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const iconsImport = req.body.iconsImport
    const iconComponent = req.body.iconComponent

    try {
        const newSkill = new skillModels({
            name: name,
            description: description,
            iconsImport: iconsImport,
            iconComponent: iconComponent
        })
        await newSkill.save()
        res.status(201).json({ success: true, message: "Skill added successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding skill " + error.message })
    }
}




const listSkills = async (req, res) => {
    try {

        const skills = await skillModels.find()
        res.status(200).json({ success: false, message: "Users List Found successfully", data: skills })


    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while listing skills" })
    }
}



const updateSkill = async (req, res) => {
    const { id } = req.params
    const name = req.body.name
    const description = req.body.description
    const iconsImport = req.body.iconsImport
    const iconComponent = req.body.iconComponent

    try {
        const skill = await userModels.findOne()
        if (skill) {
            const updatedSkill = await userModels.findByIdAndUpdate(id, {
                name,
                description,
                iconsImport,
                iconComponent
            }, {
                new: true
            })

            return res.status(200).json({ success: true, message: "Skill updated successfully", data: updatedSkill })

        }
        res.status(404).json({ success: false, message: "Skill with the specified is was not found" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating skill" })
    }

}



const deleteSkill = async (req, res) => {
    const { id } = req.params
    try {
        const skill = await skillModels.findById(id)
        if (skill) {
            await skillModels.findByIdAndDelete(id)
            return res.status(200).json({ success: true, message: "Skill Deleted sucessfully" })
        }
        res.status(404).json({ success: false, message: "Skill with specified id was not found" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occured while deleting skill " + error.message });

    }

}

module.exports = { addSkill, listSkills, updateSkill, deleteSkill }