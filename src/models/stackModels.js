const mongoose = require('mongoose');
const stack = {
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true}
}
const stacksSchema = new mongoose.Schema(stack, {  timestamps: true})

module.exports = mongoose.models.stacks || mongoose.model("stacks", stacksSchema)