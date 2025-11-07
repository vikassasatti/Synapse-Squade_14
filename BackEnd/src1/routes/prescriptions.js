const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const prescriptionController = require('../controllers/prescriptionController');

const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) { cb(null, uuidv4() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), prescriptionController.uploadPrescription);
router.get('/:id', prescriptionController.getPrescription);

module.exports = router;
