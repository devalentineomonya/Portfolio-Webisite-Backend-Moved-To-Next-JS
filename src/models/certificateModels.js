const mongoose  = require("mongoose")

const certificate = {
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },

}

const certificateSchema = mongoose.Schema(certificate,{timestamps:true})

module.exports = mongoose.models.certificates || mongoose.model('certificates',certificateSchema)
 