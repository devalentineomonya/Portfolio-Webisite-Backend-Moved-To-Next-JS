const { unlink } = require('../middlewares/uploadMiddleware');
const projectModel = require('../models/projectModels');
const { projectSchema } = require('../validation/JoiSchemas');

const checkProjectDuplicate = async (name, githubLink, liveLink) => {
    return await projectModel.findOne({
        $or: [
            { name },
            { githubLink },
            { liveLink }
        ]
    });
};

const addProject = async (req, res) => {
    const { name, description, technologies, githubLink, liveLink } = req.body;
    const image = req.file.filename;

    try {

        await projectSchema.validateAsync({ name, description, technologies, githubLink, liveLink, image });

        const checkProject = await checkProjectDuplicate(name, githubLink, liveLink);

        if (!checkProject) {
            const newProject = new projectModel({
                name,
                description,
                technologies,
                image,
                githubLink,
                liveLink
            });
            await newProject.save();
            return res.status(201).json({ success: true, message: "Project added successfully" });
        }

        unlink(image);
        res.status(400).json({ success: false, message: "Project with this name, GitHub link, or live link already exists" });
    } catch (error) {
        if (error.isJoi) {
            unlink(image);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        unlink(image);
        res.status(500).json({ success: false, message: "An error occurred while saving project: " + error.message });
    }
};

const listProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while listing projects: " + error.message });
    }
};

const updateProject = async (req, res) => {
    const projectId = req.params.id;
    const { name, description, technologies, githubLink, liveLink } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const project = await projectModel.findById(projectId);

        if (project) {
            const checkProject = await checkProjectDuplicate(name, githubLink, liveLink);

            if (!checkProject || checkProject._id.toString() === projectId) {
                const updatedFields = {
                    name,
                    description,
                    technologies,
                    githubLink,
                    liveLink
                };
                if (image) {
                    updatedFields.image = image;
                    unlink(project.image);
                }

                const updatedProject = await projectModel.findByIdAndUpdate(projectId, updatedFields, { new: true });
                return res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
            }

            return res.status(400).json({ success: false, message: "Project with the same name, live link, or GitHub link already exists" });
        }

        res.status(404).json({ success: false, message: "Project with the specified id was not found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating project: " + error.message });
    }
};

const deleteProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await projectModel.findById(projectId);

        if (project) {
            await projectModel.findByIdAndDelete(projectId);
            unlink(project.image);
            return res.status(200).json({ success: true, message: "Project deleted successfully" });
        }

        res.status(404).json({ success: false, message: "Project with specified id was not found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting project: " + error.message });
    }
};

module.exports = { addProject, listProjects, updateProject, deleteProject };
