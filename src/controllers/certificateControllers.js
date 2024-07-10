const { unlink } = require("../middlewares/uploadMiddleware");
const certificatesModel = require("../models/certificateModels");
const {certificateSchema} = require("../validation/JoiSchemas")

const addCertificate = async (req, res) => {
    const { name } = req.body;
    const image = req?.file?.filename;

    try {
        await certificateSchema.validateAsync({ name, image });

        const exists = await certificatesModel.findOne({ name });
        if (exists) {
            unlink(image);
            return res.status(400).json({ success: false, message: `${name} already exists` });
        }

        const newCertificate = new certificatesModel({ name, image });
        await newCertificate.save();
        res.status(201).json({ success: true, message: "New certificate has been added successfully" });
    } catch (error) {
        if (Joi.isError(error)) {
            unlink(image);
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        
        unlink(image);
        res.status(500).json({ success: false, message: "An error occurred while saving certificate: ", error:error.message });
    }
}


const getCertificates = async (req, res) => {
    try {
        const certificates = await certificatesModel.find();
        res.status(200).json({ success: true, count: certificates.length, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching certificates: " , error:error.message });
    }
};

const updateCertificate = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const existingCertificate = await certificatesModel.findById(id);
        if (!existingCertificate) {
            return res.status(404).json({ success: false, message: "Certificate with the specified id was not found" });
        }

        const otherCertificateWithSameName = await certificatesModel.findOne({ name, _id: { $ne: id } });
        if (otherCertificateWithSameName) {
            return res.status(400).json({ success: false, message: `${name} already exists` });
        }

        await certificatesModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({ success: true, message: "Certificate has been updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating certificate", error: error.message });
    }
};


const deleteCertificate = async (req, res) => {
    const { id } = req.params;

    try {
        const certificate = await certificatesModel.findById(id);
        if (!certificate) {
            return res.status(404).json({ success: false, message: `Certificate with id ${id} not found` });
        }

        await certificatesModel.findByIdAndDelete(id);
        unlink(certificate.image);
        res.status(200).json({ success: true, message: "Certificate has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while deleting certificate: " , error:error.message });
    }
};

module.exports = { addCertificate, updateCertificate, deleteCertificate, getCertificates };
