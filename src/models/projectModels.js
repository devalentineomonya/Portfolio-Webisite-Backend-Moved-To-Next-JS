const mongoose = require('mongoose')

const project = {
    name: { type: String, required: true , unique: true },
    description: { type: String, required: true },
    technologies: { type:Array, required: true },
    image:{ type: String, required: true},
    githubLink: { type: String, required: true, unique: true },
    liveLink: { type: String, required: true, unique:true },
    githubViews: { type: Number, default: 0 },
    liveViews: { type: Number, default: 0 }
}

const projectsSchema = mongoose.Schema(project, {timestamps:true})
module.exports = mongoose.models.projects || mongoose.model('projects', projectsSchema);
