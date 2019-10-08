const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const exe = path.extname(file.originalname);
            const name = path.basename(file.originalname, exe);

            cb(null, `${name}-${Date.now()}${exe}`)
        }
    })
}