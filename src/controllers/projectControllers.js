const { unlink } = require('../middlewares/uploadMiddleware');
const projectModel = require('../models/projectModels');

const checkProjectDuplicate = async (name, githubLink, liveLink) => {
    return await projectModel.findOne({
        $or: [
            { name },
            { githubLink },
            { liveLink }

        ]
    })
}

const addProject = async (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const technologies = req.body.technologies
    const image = req.file.filename
    const githubLink = req.body.githubLink
    const liveLink = req.body.liveLink

    try {

        const checkProject = await checkProjectDuplicate(name, githubLink, liveLink)

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



const updateProject = async (req, res) => {
    const projectId = req.params.id
    const name = req?.body?.name
    const description = req?.body?.description
    const technologies = req?.body?.technologies
    const image = req?.file?.filename
    const githubLink = req?.body?.githubLink
    const liveLink = req?.body?.liveLink
    try {
        const project = await projectModel.findById(projectId)

        if (project) {
            const checkProject = await checkProjectDuplicate(name, githubLink, liveLink)
            if (!checkProject) {
                const updatedProject = await projectModel.findByIdAndUpdate(projectId, {
                    name,
                    description,
                    technologies,
                    image,
                    githubLink,
                    liveLink
                },
                    {
                        new: true
                    })
                return res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject })
            }
            return res.status(400).json({ success: false, message: "Project with the same name, live link or github link already exists" })
        }
        res.status(404).json({ success: false, message: "Project wit the specifies id was not found" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating project" + error.message })
    }


}


const deleteProject = async (req, res) => {
    const projectId = req.params.id
    try {
        const project = await projectModel.findById(projectId)
        if (project) {
            await projectModel.findByIdAndDelete(projectId)
            unlink(project.image)
            return res.status(200).json({ success: false, message: "Project deleted successfully" })
        }
        res.status(404).json({ success: false, message: "Project with specified was not found" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting project " + error.message })
    }

}



module.exports = { addProject, listProjects, updateProject, deleteProject }
