const mongoose  = require("mongoose")

const partner = {
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

const partnerSchema = mongoose.Schema(partner,{timestamps:true})

module.exports = mongoose.models.partners || mongoose.model('partners',partnerSchema)
 