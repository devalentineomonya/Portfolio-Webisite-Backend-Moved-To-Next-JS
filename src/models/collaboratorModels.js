const mongoose = require("mongoose")

const collaborator = {
    name:{type:String,required:true,unique:true},
    role:{type:String,required:true},
    image:{type:String,required:true},
    githubLink:{type:String,required:true,unique:true}
}
const collaboratorSchema = new mongoose.Schema(collaborator,{timestamps:true})

module.exports = mongoose.models.collaborators || mongoose.model("collaborators",collaboratorSchema)
