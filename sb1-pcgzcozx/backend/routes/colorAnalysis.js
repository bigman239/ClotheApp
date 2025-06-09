const express = require('express');
const OpenAI = require('openai');
const multer = require('multer');
const router = express.Router();

// Initialize OpenAI with error handling
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error('Failed to initialize OpenAI:', error.message);
}

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Color analysis API is working',
    openaiConfigured: !!openai
  });
});

// Analyze colors from base64 image
router.post('/analyze-base64', async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).json({ 
        error: 'OpenAI not configured. Please check OPENAI_API_KEY environment variable.' 
      });
    }

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this clothing image and identify the primary color and any secondary, tertiary, and quaternary colors if they exist. Also provide the approximate percentage of each color in the image. Return the result in JSON format with the following structure: { "primary": "#HEXCODE", "secondary": "#HEXCODE or null", "tertiary": "#HEXCODE or null", "quaternary": "#HEXCODE or null", "percentages": { "#HEXCODE": number }, "description": "brief description" }',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message 
    });
  }
});

// Analyze colors from uploaded file
router.post('/analyze-file', upload.single('image'), async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).json({ 
        error: 'OpenAI not configured. Please check OPENAI_API_KEY environment variable.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const base64Image = req.file.buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this clothing image and identify the primary color and any secondary, tertiary, and quaternary colors if they exist. Also provide the approximate percentage of each color in the image. Return the result in JSON format with the following structure: { "primary": "#HEXCODE", "secondary": "#HEXCODE or null", "tertiary": "#HEXCODE or null", "quaternary": "#HEXCODE or null", "percentages": { "#HEXCODE": number }, "description": "brief description" }',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message 
    });
  }
});

module.exports = router;