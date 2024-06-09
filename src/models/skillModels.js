const mongoose = require('mongoose');
const skill = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconsImport: { type: String, required: true},
    iconComponent: { type: String, required: true}
}
const skillsSchema = new mongoose.Schema(skill, {  timestamps: true})

module.exports = mongoose.models.skills || mongoose.model("skills", skillsSchema)