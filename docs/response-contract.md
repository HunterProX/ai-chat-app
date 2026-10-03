# Response contract

`POST /api/chat` accepts:

```json
{"message":"Is production RAG demonstrated?"}
```

It returns:

```json
{
  "mode": "representative",
  "provider": "deterministic",
  "answer": "...",
  "citations": ["knowledge-no-production-rag"],
  "evidence_status": "insufficient_evidence"
}
```

Requests larger than 1000 characters and requests containing `history` are
rejected. Citations are selected only from the local allowlisted fixture.
