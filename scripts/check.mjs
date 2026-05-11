import { readFile } from 'node:fs/promises';

const required = [
  'Bubble Data API',
  'PowerDMS Bridge',
  'Apex GPT',
  'Version history',
  'E-signatures',
  'Full-text document library',
];

const files = await Promise.all(['index.html', 'src/main.js', 'src/styles.css', 'src/services/bubbleClient.js', 'src/services/powerDmsClient.js'].map((file) => readFile(file, 'utf8')));
const source = files.join('\n');
const missing = required.filter((term) => !source.includes(term));
if (missing.length > 0) {
  console.error(`Missing required UI/integration terms: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Static source check passed.');
