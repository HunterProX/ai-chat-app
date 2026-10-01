require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. You are knowledgeable about cloud architecture, full stack development, and AI integration.',
      },
      ...history,
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      response: completion.choices[0].message.content,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// RAG endpoint (placeholder)
app.post('/api/rag', async (req, res) => {
  try {
    const { query, documents = [] } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // In a real implementation, you would:
    // 1. Generate embeddings for the query
    // 2. Search vector database for similar documents
    // 3. Use retrieved documents as context for LLM

    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant. Use the following documents to answer the question:\n\n${documents.join('\n\n')}`,
      },
      { role: 'user', content: query },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      response: completion.choices[0].message.content,
      sources: documents.length,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Chat App server running on port ${PORT}`);
});
