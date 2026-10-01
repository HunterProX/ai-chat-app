# AI Chat App

**React + OpenAI API + RAG + Streaming**

## 🚀 Demo
[Live Demo](https://ai-chat-app.vercel.app)

## 📸 Screenshots
![Chat Interface](./screenshots/chat.png)

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** OpenAI API, LangChain, Pinecone (Vector DB)
- **Deploy:** Vercel

## ✨ Features

- Chat interface con respuestas en tiempo real (streaming)
- RAG system para documentos personalizados
- Historial de conversaciones
- Multi-idioma
- Dark mode

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/tuuser/ai-chat-app.git

# Install dependencies
cd ai-chat-app
npm install

# Set environment variables
cp .env.example .env
# Add your OPENAI_API_KEY and PINECONE_API_KEY

# Run development server
npm run dev
```

## 🔧 Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
```

## 📄 License

MIT
