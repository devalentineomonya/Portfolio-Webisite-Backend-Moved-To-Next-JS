const multer = require('multer')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: "src/uploads",
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${file.originalname.split(".")[0].toLowerCase()}-${uniquesuffix}.jpeg`);
    },
})


const multerFilter = (req,file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(["Unsupported file format"], false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 },
});


const unlink = (image) => {
    fs.unlink(`src/uploads/${image}`, () => { })
}


module.exports = { upload, unlink }