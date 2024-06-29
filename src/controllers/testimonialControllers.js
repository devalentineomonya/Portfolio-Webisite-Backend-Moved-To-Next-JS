const testimonialModel = require('../models/testimonial'); // Assuming your model file path is correct
const { testimonialSchema } = require('../validation/JoiSchemas');

// Create a new testimonial
const addTestimonial = async (req, res) => {
    const { name, occupation, message } = req.body;

    try {
        await testimonialSchema.validateAsync({ name, occupation, message });

        const newTestimonial = new testimonialModel({ name, occupation, message });
        await newTestimonial.save();
        res.status(201).json({ success: true, message: 'Testimonial added successfully', data: newTestimonial });
    } catch (error) {
        if (error.isJoi) {
                return res.status(400).json({ success: false, message: error.details[0].message });
        }
        res.status(500).json({ success: false, message: 'Failed to add testimonial', error: error.message });
    }
}
// Get all testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await testimonialModel.find();
        res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch testimonials', error: error.message });
    }
};

// Update a testimonial
const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, occupation, message } = req.body;

    try {
        const updatedTestimonial = await testimonialModel.findByIdAndUpdate(id, { name, occupation, message }, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, message: 'Testimonial updated successfully', data: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update testimonial', error: error.message });
    }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTestimonial = await testimonialModel.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, message: 'Testimonial deleted successfully', data: deletedTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
    }
};

module.exports = { addTestimonial, getTestimonials, updateTestimonial, deleteTestimonial };
