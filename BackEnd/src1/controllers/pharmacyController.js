const Pharmacy = require('../models/Pharmacy');

exports.getPharmacyById = async (req, res) => {
  try {
    const p = await Pharmacy.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ ok: false, error: 'Pharmacy not found' });
    return res.json({ ok: true, pharmacy: p });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

exports.getPharmacyMedicines = async (req, res) => {
  try {
    const p = await Pharmacy.findById(req.params.id, { medicines: 1 }).lean();
    if (!p) return res.status(404).json({ ok: false, error: 'Pharmacy not found' });
    return res.json({ ok: true, medicines: p.medicines });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

exports.listPharmacies = async (req, res) => {
  try {
    const q = {};
    if (req.query.name) q.name = new RegExp(req.query.name, 'i');
    const list = await Pharmacy.find(q).limit(100).lean();
    return res.json({ ok: true, pharmacies: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
