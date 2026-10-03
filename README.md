# AI Engineering Reliability Lab

An intentionally small, public-safe prototype for evaluating grounded AI API
boundaries before adding a real model provider.

## Classification

This is a **new public project / public reproduction**. It is not client code,
employer infrastructure, production RAG, or evidence that a private system used
the technologies mentioned in historical marketing drafts.

## What is implemented

- Deterministic representative mode using an allowlisted knowledge fixture.
- Provider-neutral `createProvider` boundary with deterministic implementation only.
- Bounded request size (`1000` characters maximum).
- Explicit `insufficient_evidence` responses.
- Citation IDs constrained to approved fixture records.
- No persistent conversation history, tools, agents, vector database, retrieval
  pipeline, or external network call.
- Health endpoint exposing provider mode and persistence boundary.
- Node built-in tests for supported answers, unknown questions, input limits, and
  response contract.
- Deterministic evaluation cases for supported, unsupported, private, and
  prompt-injection questions.

## What is not implemented

- Production RAG or embeddings.
- OpenAI, Anthropic, or other provider calls; unsupported providers fail closed.
- Streaming.
- Authentication, rate limiting, abuse protection, or public deployment.
- Client or employer data.
- Quality, latency, cost, or production-reliability claims.

## Run locally

Requirements: Node.js 20+.

```bash
npm test
npm start
```

Then call `http://localhost:3001/api/chat` with a JSON body containing `message`.
The next evolution should add an evaluated provider adapter only after the
deterministic contract, privacy boundary, and failure tests are reviewed.

Run the evaluation suite with `npm run evaluate`. See
[`docs/evaluation.md`](docs/evaluation.md) for the contract.
