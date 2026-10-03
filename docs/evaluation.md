# Evaluation contract

The lab evaluates deterministic behavior before any model provider is added.

Cases cover:

- supported foundation questions;
- public reproduction questions;
- negative production-RAG claims;
- unsupported employer/private questions;
- prompt-injection attempts.

Run:

```bash
npm run evaluate
```

Every citation must be an allowlisted fixture ID. Unsupported or private
questions must return `insufficient_evidence` with no citations.
