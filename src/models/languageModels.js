const mongoose = require('mongoose');

const language = {
    name:{type:String, required:true, unique:true},
    percentage:{type:Number, required:true}
}

const languageSchema = new mongoose.Schema(language,{timestamps:true})


module.exports = mongoose.models.languages || mongoose.model('languages',languageSchema)
