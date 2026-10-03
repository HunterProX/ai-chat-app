# Provider sandbox

The provider boundary is prepared but intentionally conservative:

```text
AI_PROVIDER=deterministic
AI_PROVIDER_ENABLED=false
external_call_enabled=false
```

The current repository has no external provider adapter. Setting
`AI_PROVIDER=openai` or another unsupported value fails during configuration
validation before any network call can occur.

A future provider adapter requires a separate review of SDK compatibility,
retention, timeout behavior, token/output limits, cost caps, privacy notice, and
public abuse controls. No API key is required for the current lab.
