const Prescription = require('../models/Prescription');
const fs = require('fs');
const path = require('path');

exports.uploadPrescription = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: 'No file provided' });

    const fakeExtracted = simulateOCRAndExtractMedicines(req.file.originalname);

    const doc = new Prescription({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      matchedMedicines: fakeExtracted
    });
    await doc.save();

    return res.json({
      ok: true,
      id: doc._id,
      filename: doc.filename,
      matchedMedicines: doc.matchedMedicines,
      url: `/uploads/${doc.filename}`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

exports.getPrescription = async (req, res) => {
  try {
    const doc = await Prescription.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });
    return res.json({ ok: true, prescription: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

function simulateOCRAndExtractMedicines(filename) {
  const tokens = filename.split(/[\s_.-]+/).map(t => t.toLowerCase());
  const known = ['paracetamol', 'amoxicillin', 'ibuprofen', 'cetirizine', 'metformin', 'atorvastatin'];
  return known.filter(k => tokens.some(tok => tok.includes(k))).slice(0, 5);
}
