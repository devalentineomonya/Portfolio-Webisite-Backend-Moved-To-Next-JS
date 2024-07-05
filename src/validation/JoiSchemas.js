const Joi = require('joi');

// User Schema
const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Project Schema
const projectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    technologies: Joi.array().items(Joi.string()).required(),
    githubLink: Joi.string().uri(),
    liveLink: Joi.string().uri()
});

// stack Schema
const stackSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    iconComponent: Joi.string()
});

// Language Schema
const languageSchema = Joi.object({
    name: Joi.string().required(),
    percentage:Joi.number().required()
});

// Partner Schema
const partnerSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string()
});

// Testimonial Schema
const testimonialSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    message: Joi.string().required()
});

module.exports = {
    userSchema,
    projectSchema,
    stackSchema,
    languageSchema,
    partnerSchema,
    testimonialSchema
};
