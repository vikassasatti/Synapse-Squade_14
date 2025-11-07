const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
  matchedMedicines: [{ type: String }]
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);