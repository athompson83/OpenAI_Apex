# Apex DMS

Apex DMS is a modern, AI-native document management application concept designed for policy, training, accreditation, and public-safety operations. The landing experience behaves like a GPT-style assistant that answers operational questions with links to referenced documents, while the workspace supports document lifecycle governance.

## Implemented capabilities

- Beautiful responsive React UI with a GPT-style document assistant landing page.
- Document library with full-text-search oriented filters, document cards, and status-driven selection.
- Version history, version comparison prompt, workflow stage tracking, e-signature progress, public sharing state, and recent activity views.
- Training and accreditation mapping with linked courses and compliance standards.
- Task, approval, signature, audit, and reminder dashboard.
- Integration status panel for Bubble Data API, PowerDMS Bridge, and AI Policy Copilot.
- Typed Bubble client for fetching, creating, and updating Bubble database entries.
- Typed PowerDMS bridge client for pulling, pushing, and updating external documents through a configurable adapter endpoint.

## Bubble setup

The app includes a `BubbleClient` service that targets Bubble's Data API object endpoints. Provide your Bubble app name, API token, and environment, then call:

```ts
const bubble = new BubbleClient({ appName: 'your-app', apiToken: import.meta.env.VITE_BUBBLE_API_TOKEN });
const documents = await bubble.fetchEntries('document');
await bubble.createEntry('document', { title: 'New policy' });
await bubble.updateEntry('document', 'bubble-row-id', { status: 'Published' });
```

## PowerDMS bridge

Because PowerDMS deployments and API availability differ by customer contract, the app uses a configurable bridge adapter. Point `PowerDmsClient` at your middleware or vendor-approved endpoint to import and export documents without hard-coding tenant-specific credentials in the browser.

## Development

```bash
npm run dev
npm run check
npm run build
```
