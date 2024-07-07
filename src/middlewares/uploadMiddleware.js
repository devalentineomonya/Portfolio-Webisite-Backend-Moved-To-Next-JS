const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'src/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalName = file.originalname.toLowerCase().split('.')[0];
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${originalName}-${uniqueSuffix}${extension}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 5000000 }
});

const unlink = (image) => {
    const imagePath = path.join(__dirname, '../uploads', image);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${image}: ${err}`);
        }
    });
};

module.exports = { upload, unlink };
