const mongoose = require("mongoose")

const testimonial = {
    name:{
        type:String,
        required:true,
        unique:true
    },
    occupation:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
}

const testimonialSchema = mongoose.Schema(testimonial, {timestamps:true})


module.exports = mongoose.models.testimonials || mongoose.model('testimonials', testimonialSchema)