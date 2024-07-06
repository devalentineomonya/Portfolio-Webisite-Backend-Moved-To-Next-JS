const { unlink } = require("../middlewares/uploadMiddleware");
const certificatesModel = require("../models/certificateModels");
const {partnerSchema} = require("../validation/JoiSchemas")

const addCertificate = async (req, res) => {
    const { name } = req.body;
    const image = req.file.filename;

    try {
        await partnerSchema.validateAsync({ name, image });

        const exists = await certificatesModel.findOne({ name });
        if (exists) {
            unlink(image);
            return res.status(400).json({ success: false, message: `${name} already exists` });
        }

        const newCertificate = new certificatesModel({ name, image });
        await newCertificate.save();
        res.status(201).json({ success: true, message: "New partner has been added successfully" });
    } catch (error) {
        if (Joi.isError(error)) {
            unlink(image);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        unlink(image);
        res.status(500).json({ success: false, message: "An error occurred while saving partner: " + error.message });
    }
}


const getCertificates = async (req, res) => {
    try {
        const certificates = await certificatesModel.find();
        res.status(200).json({ success: true, count: certificates.length, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching partners: " + error.message });
    }
};

const updateCertificate = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const partner = await certificatesModel.findById(id);
        if (!partner) {
            return res.status(404).json({ success: false, message: "Certificate with the specified id was not found" });
        }

        await certificatesModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({ success: true, message: "Certificate has been updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating partner: " + error.message });
    }
};

const deleteCertificate = async (req, res) => {
    const { id } = req.params;

    try {
        const partner = await certificatesModel.findById(id);
        if (!partner) {
            return res.status(404).json({ success: false, message: `Certificate with id ${id} not found` });
        }

        await certificatesModel.findByIdAndDelete(id);
        unlink(certificate.image);
        res.status(200).json({ success: true, message: "Certificate has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting partner: " + error.message });
    }
};

module.exports = { addCertificate, updateCertificate, deleteCertificate, getCertificates };
