const { unlink } = require("../middlewares/uploadMiddleware");
const partnersModel = require("../models/partnerModels");

const addPartner = async (req, res) => {
    const { name } = req.body;
    const image = req.file.filename;

    try {
        const exists = await partnersModel.findOne({ name });
        if (exists) {
            unlink(image);
            return res.status(400).json({ success: false, message: `${name} already exists` });
        }

        const newPartner = new partnersModel({ name, image });
        await newPartner.save();
        res.status(201).json({ success: true, message: "New partner has been added successfully" });
    } catch (error) {
        unlink(image);
        res.status(500).json({ success: false, message: "An error occurred while saving partner: " + error.message });
    }
};

const getPartners = async (req, res) => {
    try {
        const partners = await partnersModel.find();
        res.status(200).json({ success: true, length: partners.length, data: partners });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching partners: " + error.message });
    }
};

const updatePartner = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const partner = await partnersModel.findById(id);
        if (!partner) {
            return res.status(404).json({ success: false, message: "Partner with the specified id was not found" });
        }

        await partnersModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({ success: true, message: "Partner has been updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating partner: " + error.message });
    }
};

const deletePartner = async (req, res) => {
    const { id } = req.params;

    try {
        const partner = await partnersModel.findById(id);
        if (!partner) {
            return res.status(404).json({ success: false, message: `Partner with id ${id} not found` });
        }

        await partnersModel.findByIdAndDelete(id);
        unlink(partner.image);
        res.status(200).json({ success: true, message: "Partner has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting partner: " + error.message });
    }
};

module.exports = { addPartner, updatePartner, deletePartner, getPartners };
