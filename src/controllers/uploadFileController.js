const BaseController = require("./BaseController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// --- Multer Configuration ---
const UPLOAD_FOLDER = path.join(__dirname, "../uploads"); // Adjust path as needed

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB (adjust as needed)
  fileFilter: function (req, file, cb) {
    // Allowed file types: PDF and CSV
    const allowedMimeTypes = ['application/pdf', 'text/csv',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX,
        'application/msword' // DOC
    ]; // MIME types for PDF and CSV
    const allowedExtnames = [
      '.pdf',
      '.csv',
      '.doc',
      '.docx'
    ];
    // Check MIME type
    const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);

    // Check extension
    const extname = path.extname(file.originalname).toLowerCase();
    const isExtnameAllowed = allowedExtnames.includes(extname);

    if (isMimeTypeAllowed && isExtnameAllowed) {
      return cb(null, true); // Allow file
    } else {
      // Reject file with a specific error message
      cb(new Error("Error: Only PDF and CSV files are allowed!"));
    }
  },
});

class UploadController extends BaseController {
  uploadFile = [
    upload.single("file"), // Assuming 'file' is the input field name
    BaseController.handle((req, res) => {
      if (!req.file) {
        return this.sendError(res, new Error("No file selected or uploaded."), "No file uploaded", 400);
      }

      const fileInfo = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: `/uploads/${req.file.filename}`
      };

      return this.sendSuccess(res, fileInfo, 200);
    }),
  ];

  uploadMultipleFiles = [
    upload.array("files", 10), // Assuming 'files' is the input field name for multiple uploads
    BaseController.handle((req, res) => {
      if (!req.files || req.files.length === 0) {
        return this.sendError(res, new Error("No files selected or uploaded."), "No files uploaded", 400);
      }

      const filesInfo = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/${file.filename}`
      }));

      return this.sendSuccess(res, filesInfo, `${filesInfo.length} files uploaded successfully!`);
    })
  ];
}

module.exports = new UploadController();