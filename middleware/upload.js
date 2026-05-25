const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {};

const uploadClient = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadSingleFile = (req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(300).json({
      message: "Multer error occurred when uploading.",
      error: err,
    });
  }
  uploadClient.single("avatar");
  next();
};
const uploadMultipleFiles = (req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(300).json({
      message: "Multer error occurred when uploading.",
      error: err,
    });
  }
  uploadClient.array("photos", 12);
  next();
};

const uploadFiles = (req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(300).json({
      message: "Multer error occurred when uploading.",
      error: err,
    });
  }
  uploadClient.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 8 },
  ]);
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
