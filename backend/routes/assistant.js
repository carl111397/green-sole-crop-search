const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // <-- Your actual API key here

router.post('/', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert Kenyan farming assistant.' },
        { role: 'user', content: query }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content.trim();
    res.json({ suggestion: aiResponse });

  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ suggestion: 'AI failed to respond. Please try again.' });
  }
});

module.exports = router;
