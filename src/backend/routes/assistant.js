const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { query } = req.body;

  let aiResponse = "I'm not sure how to help with that yet.";

  if (query.toLowerCase().includes('maize')) {
    aiResponse = 'Ensure your soil nitrogen levels are optimal for Maize yields.';
  } else if (query.toLowerCase().includes('soil')) {
    aiResponse = 'Consider soil pH testing before fertilizer application.';
  } else if (query.toLowerCase().includes('drought')) {
    aiResponse = 'Drought-resistant crops like Sorghum are ideal in LM 4-5 zones.';
  }

  res.json({ suggestion: aiResponse });
});

module.exports = router;
