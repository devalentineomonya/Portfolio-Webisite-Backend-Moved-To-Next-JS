const mongoose = require('mongoose')

const project = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    githubLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    githubView: { type: Number, default: 0 },
    liveView: { type: Number, default: 0 }
}

const projectsSchema = mongoose.schema(project)
module.exports = mongoose.models.projects || mongoose.model('projects', projectsSchema);
