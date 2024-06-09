const { unlink } = require('../middlewares/uploadMiddleware');
const projectModel = require('../models/projectModels');



const addProject = async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const technologies = req.body.technologies
    const image = req.file.filename
    const githubLink = req.body.githubLink
    const liveLink = req.body.liveLink




    try {

        const checkProject = await projectModel.findOne({
            $or: [
                { name },
                { githubLink },
                { liveLink }

            ]
        })

        if (!checkProject) {
            const newProject = new projectModel({
                name,
                description,
                image,
                technologies,
                githubLink,
                liveLink
            })
            await newProject.save()
            return res.status(201).json({ success: true, message: "Project Added Successfully" })
        }

        unlink(image)
        res.status(400).json({ success: false, message: "Project With this name, github link or live link already exists" })

    } catch (error) {
        unlink(image)
        res.status(500).json({ success: false, message: "An error occured while saving project\n " + error.message })
    }

}


const listProjects = async (req, res) => {
    try {
        const projects = await projectModel.find()
        res.status(200).json({ success: true, length: projects.length, data: projects })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while listing projects \n" + error.message })
    }

}

const updateProject = (req, res) => {

}


const deleteProject = (req, res) => {

}



module.exports = { addProject, listProjects, updateProject, deleteProject }
