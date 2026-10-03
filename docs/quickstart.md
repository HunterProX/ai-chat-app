# AI Reliability Lab quickstart

## Prerequisites

- Node.js 20 or newer
- npm
- Git

## Install, test, and run

```powershell
git clone https://github.com/HunterProX/ai-chat-app.git
cd ai-chat-app
npm install
npm test
npm start
```

The server listens on <http://localhost:3001>.

## Verify health

```powershell
Invoke-RestMethod http://localhost:3001/health
```

Expected values include:

```json
{"status":"ok","provider":"deterministic","persistent_history":false}
```

## Verify a grounded response

```powershell
$body = @{ message = "Is production RAG demonstrated?" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3001/api/chat -Method Post -ContentType "application/json" -Body $body
```

The response must contain `provider: deterministic`, a bounded citation list,
and `insufficient_evidence` for unsupported claims.

## Boundary

No API key is required. The lab does not use OpenAI, RAG, embeddings, vector
search, agents, tools, streaming, persistent history, or client data.
