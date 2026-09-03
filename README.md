<div align="center">

# Apex DMS

**An AI-native document-management workspace for policies, training, accreditation, and public-safety operations.**

![Stage](https://img.shields.io/badge/stage-application%20concept-1D4ED8?style=flat-square)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-1D4ED8?style=flat-square&logo=react&logoColor=white)
![Integrations](https://img.shields.io/badge/integrations-adapter%20based-1D4ED8?style=flat-square)

</div>

## Why Apex DMS exists

Traditional document repositories make files searchable but often leave users to interpret policy, find the current version, understand approval state, and connect documents to training or accreditation requirements themselves. Apex DMS explores a governed workspace where users can ask operational questions, follow answers back to source documents, and manage the document lifecycle in one place.

## Implemented application surfaces

| Surface | Purpose |
| --- | --- |
| Document assistant | GPT-style question experience with document references |
| Library | Search-oriented filters, cards, status, and selection |
| Lifecycle | Versions, comparison prompts, workflow stages, signatures, and sharing state |
| Compliance | Training and accreditation mappings |
| Work management | Tasks, approvals, reminders, activity, and audit-oriented views |
| Integrations | Typed Bubble and PowerDMS bridge clients |

## Integration model

Apex DMS uses adapters rather than hard-coding customer systems into the UI.

- **Bubble:** the typed client can fetch, create, and update Data API entries.
- **PowerDMS:** a configurable bridge is expected because access and API capabilities vary by customer agreement.

```ts
const bubble = new BubbleClient({
  appName: 'your-app',
  apiToken: import.meta.env.VITE_BUBBLE_API_TOKEN,
});

const documents = await bubble.fetchEntries('document');
```

> [!CAUTION]
> A browser-delivered token is visible to the user. Production integrations should use a server-side boundary, least-privilege credentials, tenant isolation, audit logging, and explicit authorization.

## Local development

```bash
npm install
npm run dev
npm run check
npm run build
```

## Production path

1. **MVP:** establish the canonical document model, versioning rules, search, lifecycle workflow, and one secure integration.
2. **Beta:** validate permissions, auditability, source-grounded answers, accessibility, recovery, and representative document volumes.
3. **Production:** complete deployment, retention, backup, legal, security, and customer-integration certification.

The current repository demonstrates product and integration concepts; it should not be represented as a certified records system or authoritative policy repository until those controls are implemented and verified.