const express = require('express');
const router = express.Router();
const seed = require('../seedScript');

router.post('/', async (req, res) => {
  try {
    const result = await seed();
    return res.json({ ok: true, inserted: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
