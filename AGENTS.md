# Apex DMS — shared agent guidance

## Context and boundaries

- Read `README.md`, current source/manifests, relevant status records, and scoped instructions. Apex DMS (`OpenAI_Apex`) is a document-management concept/prototype, not the separate APEx360 evaluation app or a certified policy/records system.
- Preserve source-grounded document answers, version/approval state, library/lifecycle, and adapter boundaries. Never present drafts/superseded material or an unsupported model answer as authoritative current policy.
- Typed/client adapters and interface labels do not prove live Bubble/PowerDMS access. Confirm customer-authorized capabilities and actual runtime wiring; do not bypass provider/customer access restrictions.
- Browser-delivered tokens are public. Privileged integrations need a server-side, least-privilege, tenant-isolated, audited authorization boundary; never commit or log document contents or service credentials.
- Use one bounded end-to-end acceptance outcome with non-goals, not a complete DMS rewrite. Retain any adopted canonical control standard/current owner authority rather than introducing a competing constitution.

## Actual foundation evidence

- The root manifest declares no dependencies or lockfile. It runs a Python static server (`npm run dev`), a file-copy build (`npm run build`), and a static source-term check (`npm run check`). Do not claim a React/TypeScript compilation, behavior suite, live integration, or security certification from those commands.
- `scripts/check.mjs` checks for required text labels across source files; `scripts/build.mjs` copies files into dist. Preserve their truthful scope and add real behavioral tests only when implemented.
- For local serving, bind explicitly to loopback rather than exposing repository files to an untrusted network. Use safe synthetic documents and do not place credentials/private files in the served tree.
- Pin compatible Node/Python/tooling as part of a tested reproducible foundation. A dependency-free app does not need ceremonial packages or a fabricated lockfile; add an authoritative frozen-install lockfile only if real dependencies are introduced.
- Acceptance for one secure integration: an authorized user retrieves a permitted document version, the answer/reference resolves to that exact source/version, and unauthorized/draft retrieval is rejected. Include malformed input, missing source, provider failure, and stale-version cases.
- Ordinary tests must not call paid providers or use Production/customer credentials. Distinguish static fixtures, stubbed adapters, hosted integration, and actual approved release.
- No placeholder-success tests or swallowed failures. Prove intentional failure detection when changing verification; source-term checks alone are not a meaningful end-to-end smoke test.
- Record variable names, consuming surface, environment, public/server-only classification, and validation methods—not values.

## Economical delivery and handoff

- Run focused local checks before coherent pushes; broaden for auth/documents/retention/contracts, dependencies/toolchain/workflows, and agent policy. Diagnose full failing logs before reruns; avoid speculative pushes, duplicate suites, and unrelated cloud work.
- Prose-only CI routing needs an explicit allowlist; policy/executable Markdown is impact-bearing. Preserve observable required workflows and test a final gate rejecting failed/cancelled/missing required work.
- Use least privilege, immutable action references, and untrusted/privileged separation. Cancel superseded PR validation where safe, not deployments/migrations. Check real branch rules, canonical targets, scopes, triggers, recovery, and release authority before merging; merges may deploy.
- Reuse approved previews/projects; fix relevant blockers and record unrelated cleanup without expanding scope. Track implemented/wired/locally verified/hosted verified/released independently with SHA, commands/results, target, and evidence.
- Keep existing checklist/progress concise and evidence-linked; use PROJECT_CHECKLIST/PROGRESS when adopted without parallel trackers. Preserve history, report actual checks/owner decisions/next task, and confirm fresh Codex/Claude loading. Load deeper docs/skills only when relevant.

Adoption evidence: 2026-09-10, inspected README, root tree, manifest, check/build scripts, and main at `ffc96b1da2fc0c536bebfd0b7d44975777c173a1`. Runtime/browser/fresh-agent/failure-propagation checks NOT_RUN; local cloning unavailable due to DNS resolution. No code, dependencies, workflow, records, credentials, platform, or release changes.
