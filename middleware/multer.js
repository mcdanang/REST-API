const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'PIMG-' + Date.now() + '.' + file.mimetype.split('/')[1],
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true);
  } else if (file.mimetype.split('/')[1] !== 'pdf') {
    cb(new Error('File format not match'));
  }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });