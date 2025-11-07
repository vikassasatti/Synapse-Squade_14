require('dotenv').config();
const connectDB = require('./config/db');
const seedScript = require('./seedScript');

(async () => {
  try {
    await connectDB();
    const count = await seedScript();
    console.log(`Inserted ${count} pharmacies`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();