const projectModel = require('../models/projectModels');



const addProject = async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const technologies = req.body.technologies
    const githubLink = req.body.githubLink
    const liveLink = req.body.liveLink

    try {
        const newProject = new projectModel.Project({
            name: name,
            description: description,
            technologies: technologies,
            githubLink: githubLink,
            liveLink: liveLink
        })
        await newProject.save()
        res.status(201).json({ success: true, message: "Project Added Successfully" })

    } catch (error) {
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
