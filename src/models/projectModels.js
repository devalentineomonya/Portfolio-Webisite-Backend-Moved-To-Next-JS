const mongoose = require('mongoose')

const project = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type:Object, required: true },
    githubLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    githubViews: { type: Number, default: 0 },
    liveViews: { type: Number, default: 0 }
}

const projectsSchema = mongoose.schema(project)
module.exports = mongoose.models.projects || mongoose.model('projects', projectsSchema);
