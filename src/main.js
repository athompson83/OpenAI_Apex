const documents = [
  {
    id: 'POL-1024', title: 'Use of Force Response Policy', type: 'Policy', owner: 'Captain Rivera', department: 'Operations', status: 'Published', stage: 'Published', updatedAt: '2026-05-01', reviewDue: '2026-08-15',
    tags: ['public safety', 'high-liability', 'annual review'], visibility: 'Organization', signaturesRequired: 318, signaturesComplete: 292, complianceStandard: 'CALEA 4.1.1',
    content: 'Officers must apply de-escalation techniques when practical, document each force event, notify a supervisor before end of shift, and complete annual scenario training tied to this policy.',
    versions: [
      { version: '3.0', summary: 'Added de-escalation documentation and supervisor notification language.' },
      { version: '2.4', summary: 'Clarified reporting deadlines and removed duplicate definitions.' },
    ],
    linkedCourses: ['Annual Use of Force Refresher', 'Supervisor Force Review'],
    activity: ['292 acknowledgements captured', '12 comments resolved', 'Shared with patrol division'],
  },
  {
    id: 'TRN-4481', title: 'Cybersecurity Awareness Training', type: 'Training', owner: 'Morgan Chen', department: 'IT', status: 'In Review', stage: 'Legal Review', updatedAt: '2026-04-27', reviewDue: '2026-06-05',
    tags: ['training', 'security', 'annual'], visibility: 'Organization', signaturesRequired: 146, signaturesComplete: 91, complianceStandard: 'CJIS Security Policy 5.9',
    content: 'This course covers phishing, multi-factor authentication, incident reporting, protected data handling, password manager usage, and annual attestation requirements.',
    versions: [{ version: '5.1', summary: 'Expanded MFA and incident reporting modules.' }],
    linkedCourses: ['Cybersecurity Awareness Training'],
    activity: ['Legal reviewer assigned', 'Bubble training record updated', 'Reminder scheduled for 2026-05-18'],
  },
  {
    id: 'ACC-3308', title: 'Evidence Room Audit Checklist', type: 'Accreditation', owner: 'Sgt. Malik Thompson', department: 'Compliance', status: 'Approved', stage: 'Approved', updatedAt: '2026-04-10', reviewDue: '2026-07-01',
    tags: ['audit', 'evidence', 'accreditation'], visibility: 'Private', signaturesRequired: 8, signaturesComplete: 8, complianceStandard: 'CALEA 84.1.6',
    content: 'Quarterly audits validate chain-of-custody records, controlled access logs, sealed packaging, climate controls, discrepancy resolution, and corrective action evidence.',
    versions: [{ version: '2.0', summary: 'Mapped every checklist item to accreditation proof folders.' }],
    linkedCourses: ['Evidence Custodian Onboarding'],
    activity: ['Audit task packet generated', '8 signatures completed', 'Exported to accreditation binder'],
  },
];

const tasks = [
  { title: 'Approve Use of Force edits', owner: 'Deputy Chief Adams', due: 'Today', priority: 'High', category: 'Approval' },
  { title: 'Send cybersecurity acknowledgement reminders', owner: 'Morgan Chen', due: 'Tomorrow', priority: 'Medium', category: 'Signature' },
  { title: 'Attach May audit evidence', owner: 'Sgt. Malik Thompson', due: 'May 20', priority: 'High', category: 'Audit' },
  { title: 'Review public portal version of pursuit policy', owner: 'Captain Rivera', due: 'May 23', priority: 'Medium', category: 'Review' },
];

const integrations = [
  { name: 'Bubble Data API', status: 'Connected', description: 'Fetches, creates, and updates Bubble database entries for documents, tasks, users, courses, and acknowledgement records.', lastSync: '5 minutes ago' },
  { name: 'PowerDMS Bridge', status: 'Needs setup', description: 'Configurable connector for importing PowerDMS files and pushing approved document versions to external repositories.', lastSync: 'Not connected' },
  { name: 'AI Policy Copilot', status: 'Connected', description: 'Answers questions with cited document snippets, drafts policy summaries, detects stale language, and suggests reviewer assignments.', lastSync: 'Live' },
];

const workflowSteps = ['Draft', 'Legal Review', 'Command Review', 'Approved', 'Published'];
const state = { selectedDocument: documents[0], filter: 'All', query: 'What does our use of force policy require after an incident?' };

const askCopilot = (question) => {
  const terms = question.toLowerCase().split(/\W+/).filter((term) => term.length > 2);
  const ranked = documents
    .map((document) => ({ document, score: terms.reduce((score, term) => `${document.title} ${document.content} ${document.tags.join(' ')} ${document.complianceStandard}`.toLowerCase().includes(term) ? score + 1 : score, 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const citedDocuments = ranked.filter((item) => item.score > 0).map((item) => item.document);
  const citations = citedDocuments.length > 0 ? citedDocuments : documents.slice(0, 2);
  const primary = citations[0];
  return {
    answer: `Based on ${primary.title}, the most relevant requirement is: ${primary.content} The document is currently ${primary.status.toLowerCase()}, owned by ${primary.owner}, and its next review is due ${primary.reviewDue}. I would route this to ${primary.stage} and notify outstanding signers before the due date.`,
    citations,
  };
};

const icon = (value) => `<span class="icon" aria-hidden="true">${value}</span>`;
const tags = (items) => items.map((tag) => `<span>${tag}</span>`).join('');
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

function render() {
  const result = askCopilot(state.query);
  const visibleDocuments = state.filter === 'All' ? documents : documents.filter((document) => document.type === state.filter || document.status === state.filter);

  document.querySelector('#root').innerHTML = `
    <main class="app-shell">
      <section class="hero-panel">
        <nav class="topbar">
          <div class="brand"><div class="brand-mark">${icon('🛡️')}</div><div><strong>Apex DMS</strong><span>AI-native policy, training, and compliance operations</span></div></div>
          <div class="top-actions"><span class="secure-pill">${icon('🔒')} SOC-ready controls</span><button class="ghost-button">${icon('📱')} Mobile ready</button></div>
        </nav>
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">${icon('✨')} Ask every policy. Trust every answer.</span>
            <h1>Document management built to outrun legacy policy platforms.</h1>
            <p>Apex DMS combines governed document lifecycles, public safety workflows, e-signatures, Bubble database sync, PowerDMS bridging, and cited AI answers in one modern workspace.</p>
            <div class="hero-actions"><button class="primary-button">${icon('☁️')} Import documents</button><button class="secondary-button">${icon('⚡')} Configure integrations</button></div>
          </div>
          <section class="copilot-card" aria-label="AI policy copilot">
            <div class="copilot-header"><div>${icon('🤖')} Apex GPT</div><span>Grounded in your documents</span></div>
            <div class="prompt-box">${icon('💬')}<textarea id="query-input">${escapeHtml(state.query)}</textarea><button id="ask-button">Ask</button></div>
            <div class="answer-card"><p>${escapeHtml(result.answer)}</p><div class="citation-list">${result.citations.map((citation) => `<a class="citation-card" href="#${citation.id}"><strong>${citation.title}</strong><span>${citation.id}</span><p>${citation.content.slice(0, 112)}...</p></a>`).join('')}</div></div>
            <div class="follow-ups"><button>Draft an acknowledgement reminder</button><button>Show review-due documents</button><button>Compare current and previous versions</button></div>
          </section>
        </div>
      </section>

      <section class="metric-row">
        ${metric('📄', 'Governed documents', '1,284', '94% current')}
        ${metric('✅', 'Acknowledgements', '18,420', '+12% this month')}
        ${metric('🔔', 'Automated reminders', '342', '67 due this week')}
        ${metric('📈', 'Audit readiness', '98%', '12 standards mapped')}
      </section>

      <section class="workspace-grid">
        <div class="library-panel glass-panel">
          ${panelTitle('🔎', 'Full-text document library', 'Search, filter, share, approve, and archive critical content.')}
          <div class="filter-row">${['All', 'Policy', 'Training', 'Accreditation', 'Published', 'In Review'].map((item) => `<button class="${state.filter === item ? 'active' : ''}" data-filter="${item}">${item}</button>`).join('')}</div>
          <div class="document-list">${visibleDocuments.map(documentCard).join('')}</div>
        </div>
        <div class="detail-panel glass-panel">${detailPanel(state.selectedDocument)}</div>
      </section>

      <section class="operations-grid">
        <div class="glass-panel">${panelTitle('🔔', 'Tasks, reminders, and approvals', 'Automated review cycles keep owners moving.')}${tasks.map(taskRow).join('')}</div>
        <div class="glass-panel">${panelTitle('⚡', 'Bubble + PowerDMS integrations', 'Sync your Bubble app and bridge approved documents to external DMS repositories.')}${integrations.map(integrationRow).join('')}</div>
      </section>
    </main>`;

  bindEvents();
}

const metric = (emoji, label, value, trend) => `<article class="metric-card"><div>${icon(emoji)}</div><span>${label}</span><strong>${value}</strong><small>${trend}</small></article>`;
const panelTitle = (emoji, title, subtitle) => `<header class="panel-title"><div>${icon(emoji)}</div><section><h2>${title}</h2><p>${subtitle}</p></section></header>`;
const documentCard = (document) => `<button class="document-card ${state.selectedDocument.id === document.id ? 'selected' : ''}" data-document-id="${document.id}" id="${document.id}"><div><span class="doc-type">${document.type}</span><h3>${document.title}</h3><p>${document.content}</p><div class="tag-row">${tags(document.tags)}</div></div><span>›</span></button>`;
const feature = (emoji, title, text) => `<article class="feature-card"><div>${icon(emoji)}</div><strong>${title}</strong><p>${text}</p></article>`;

function detailPanel(document) {
  const completedStage = workflowSteps.indexOf(document.stage);
  return `
    ${panelTitle('🧬', 'Lifecycle command center', 'Version control, comparison, approvals, signatures, and audit history.')}
    <div class="detail-hero"><div><span class="doc-id">${document.id}</span><h2>${document.title}</h2><p>${document.content}</p></div><span class="status-badge ${document.status.replace(' ', '-').toLowerCase()}">${document.status}</span></div>
    <div class="workflow-track">${workflowSteps.map((step, index) => `<div class="step ${index <= completedStage ? 'done' : ''}"><span></span>${step}</div>`).join('')}</div>
    <div class="feature-grid">
      ${feature('🕘', 'Version history', `${document.versions.length} tracked version(s), latest ${document.versions[0]?.version}.`)}
      ${feature('✍️', 'E-signatures', `${document.signaturesComplete}/${document.signaturesRequired} acknowledgements complete.`)}
      ${feature('🆚', 'Side-by-side compare', document.versions[1]?.summary ?? 'Ready when another version is available.')}
      ${feature('🌐', 'Public sharing', `Visibility is set to ${document.visibility}.`)}
    </div>
    <div class="split-section"><div><h3>Recent activity</h3>${document.activity.map((item) => `<p class="activity-line">${icon('📌')} ${item}</p>`).join('')}</div><div><h3>Training & accreditation</h3><p class="standard">${icon('📋')} ${document.complianceStandard ?? 'No standard mapped yet'}</p>${document.linkedCourses.map((course) => `<p class="activity-line">${icon('✅')} ${course}</p>`).join('')}</div></div>`;
}

const taskRow = (task) => `<div class="task-row"><div><strong>${task.title}</strong><span>${task.owner} · ${task.category}</span></div><b class="${task.priority.toLowerCase()}">${task.due}</b></div>`;
const integrationRow = (integration) => `<div class="integration-row"><div><strong>${integration.name}</strong><p>${integration.description}</p><span>Last sync: ${integration.lastSync}</span></div><em>${integration.status}</em></div>`;

function bindEvents() {
  document.querySelector('#ask-button').addEventListener('click', () => {
    state.query = document.querySelector('#query-input').value;
    render();
  });
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    render();
  }));
  document.querySelectorAll('[data-document-id]').forEach((button) => button.addEventListener('click', () => {
    state.selectedDocument = documents.find((document) => document.id === button.dataset.documentId) ?? documents[0];
    render();
  }));
}

render();
