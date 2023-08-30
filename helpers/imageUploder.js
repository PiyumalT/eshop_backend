const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

//Storage for images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!file) {
            return res.status(400).send('No image in the request');
        }
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');
        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    //Rename the file
    // filename: function (req, file, cb) {
    //     const fileName = file.originalname.split(' ').join('-');
    //     cb(null, Date.now() + '-' + fileName)
    // }
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
const uploadOptions = multer({ storage: storage })
exports.uploadOptions = uploadOptions;
