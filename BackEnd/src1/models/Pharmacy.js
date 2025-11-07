const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  generic: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  substitutes: [{ type: String }]
});

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  medicines: [MedicineSchema],
  createdAt: { type: Date, default: Date.now }
});

PharmacySchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Pharmacy', PharmacySchema);