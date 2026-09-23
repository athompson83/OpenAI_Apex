# Architecture context for agents

Source baseline: ffc96b1da2fc0c536bebfd0b7d44975777c173a1 on main. Apex DMS is a concept-stage document-management workspace. Its README explicitly says it is not yet a certified records system or authoritative policy repository.

## Runtime and source boundaries

- index.html loads src/main.js as a browser module and mounts into #root. The UI and demo records are implemented in that one JavaScript module, styled by src/styles.css.
- The assistant behavior in src/main.js performs local lexical scoring against in-memory document content, then returns that content with citations. It does not invoke a model, database, search index, or external citation service.
- src/services/bubbleClient.js and src/services/powerDmsClient.js define adapter classes for Bubble and PowerDMS requests. Neither is imported by src/main.js, so current screens do not demonstrate working adapter integration. The README cautions that a browser-delivered token is visible to its user and recommends a server-side boundary, least privilege, tenant isolation, and audit logging.
- scripts/build.mjs copies index.html and src into dist. scripts/check.mjs checks for expected feature labels in selected source text; it does not prove workflows or integrations. package.json uses Python's HTTP server for local dev and Node scripts for build/check.

## Diagrams

- [System overview](./system-overview.mmd)
- [Assistant and integration boundaries](./assistant-and-integrations.mmd)

## Source map

- Browser surface: index.html, src/main.js, src/styles.css
- Adapters: src/services/bubbleClient.js, src/services/powerDmsClient.js
- Tooling: scripts/build.mjs, scripts/check.mjs, package.json
- Product boundary: README.md

Graph: .ua/knowledge-graph.json. Exact analyzed inventory and import map: .ua/intermediate/scan-result.json.
