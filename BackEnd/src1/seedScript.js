const Pharmacy = require('./models/Pharmacy');

module.exports = async function seed() {
  await Pharmacy.deleteMany({});

  const sample = [
    {
      name: 'CityCare Pharmacy',
      address: '12 MG Road',
      phone: '+91-9876501234',
      location: { type: 'Point', coordinates: [77.5946, 12.9716] },
      medicines: [
        { name: 'Crocin 650', generic: 'paracetamol', price: 40, stock: 20, substitutes: ['Calpol', 'Efferalgan'] },
        { name: 'Augmentin 625', generic: 'amoxicillin', price: 180, stock: 10, substitutes: [] }
      ]
    },
    {
      name: 'HealthPlus Pharmacy',
      address: 'MG Road Plaza',
      phone: '+91-9988776655',
      location: { type: 'Point', coordinates: [77.5950, 12.9700] },
      medicines: [
        { name: 'Dolo 650', generic: 'paracetamol', price: 35, stock: 15, substitutes: ['Crocin 650'] },
        { name: 'Cipro 500', generic: 'ciprofloxacin', price: 90, stock: 5, substitutes: [] }
      ]
    },
    {
      name: '24x7 Pharmacy',
      address: 'Ring Road',
      phone: '+91-9123456780',
      location: { type: 'Point', coordinates: [77.6000, 12.9720] },
      medicines: [
        { name: 'Metformin 500', generic: 'metformin', price: 50, stock: 50, substitutes: [] },
        { name: 'Paracet', generic: 'paracetamol', price: 30, stock: 0, substitutes: ['Dolo 650'] }
      ]
    }
  ];

  const inserted = await Pharmacy.insertMany(sample);
  return inserted.length;
};
