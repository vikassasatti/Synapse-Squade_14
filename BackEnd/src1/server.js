require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const searchRoutes = require('./routes/search');
const pharmacyRoutes = require('./routes/pharmacies');
const prescriptionRoutes = require('./routes/prescriptions');
const seedRoutes = require('./routes/seed');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

app.use('/api/search', searchRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/seed', seedRoutes);

app.get('/', (req, res) => res.send({ ok: true, message: 'Smart Medicine Locator Backend' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));