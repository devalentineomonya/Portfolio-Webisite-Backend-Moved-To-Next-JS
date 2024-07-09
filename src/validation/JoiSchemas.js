const Joi = require('joi');

// User Schema
const userSchema = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Project Schema
const projectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    technologies: Joi.array().items(Joi.string()).required(),
    githubLink: Joi.string().uri().required(),
    liveLink: Joi.string().uri().required(),
    image: Joi.string().required()
});

// stack Schema
const stackSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    iconName: Joi.string()
});

// Language Schema
const languageSchema = Joi.object({
    name: Joi.string().required(),
    percentage: Joi.number().required()
});

// Certificates Schema
const certificateSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string()
});

// Testimonial Schema
const testimonialSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    message: Joi.string().required()
});

const collaboratorSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    image: Joi.string().uri().required(),
    githubLink: Joi.string().uri().required()
});


module.exports = {
    userSchema,
    projectSchema,
    stackSchema,
    languageSchema,
    certificateSchema,
    testimonialSchema,
    collaboratorSchema
};
