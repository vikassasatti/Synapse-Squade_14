const Pharmacy = require('../models/Pharmacy');
exports.searchMedicines = async (req, res) => {
  try {
    const { medicine, lat, lng, radius = 5000, sort } = req.query;
    if (!medicine) return res.status(400).json({ ok: false, error: 'medicine query required' });
    const medRegex = new RegExp(medicine, 'i');
    const pipeline = [
      { $match: { 'medicines.name': medRegex } },
      { $addFields: { matchedMedicines: { $filter: { input: '$medicines', as: 'm', cond: { $regexMatch: { input: '$$m.name', regex: medRegex } } } } } },
      { $project: { name: 1, address: 1, phone: 1, location: 1, matchedMedicines: 1 } }
    ];
    if (lat && lng) {
      const lngNum = parseFloat(lng), latNum = parseFloat(lat), radNum = parseFloat(radius);
      pipeline.unshift({ $geoNear: { near: { type: 'Point', coordinates: [lngNum, latNum] }, distanceField: 'distance', spherical: true, maxDistance: radNum } });
    }
    let results = await Pharmacy.aggregate(pipeline);
    results = results.map(p => {
      const meds = p.matchedMedicines.map(m => ({ name: m.name, generic: m.generic, price: m.price, stock: m.stock, substitutes: m.substitutes }));
      const cheapest = meds.reduce((acc, cur) => (acc === null || cur.price < acc.price ? cur : acc), null);
      return { ...p, meds, cheapestPrice: cheapest ? cheapest.price : null };
    });
    if (sort === 'price') results.sort((a, b) => (a.cheapestPrice || 0) - (b.cheapestPrice || 0));
    else if (sort === 'distance' && lat && lng) results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    return res.json({ ok: true, results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};
exports.getSubstitutes = async (req, res) => {
  try {
    const { medicine } = req.query;
    if (!medicine) return res.status(400).json({ ok: false, error: 'medicine query required' });
    const medRegex = new RegExp(medicine, 'i');
    const pharmacies = await Pharmacy.find({ 'medicines.name': medRegex }, { 'medicines.$': 1 });
    const subs = new Set();
    for (const p of pharmacies) {
      (p.medicines || []).forEach(m => {
        if (m.generic) subs.add(m.generic);
        (m.substitutes || []).forEach(s => subs.add(s));
      });
    }
    return res.json({ ok: true, substitutes: Array.from(subs) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};