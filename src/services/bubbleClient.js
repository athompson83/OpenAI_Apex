const bubbleBaseUrl = ({ appName, version = 'live' }) =>
  `https://${appName}.bubbleapps.io/${version === 'development' ? 'version-test/' : ''}api/1.1/obj`;

export class BubbleClient {
  constructor(config) {
    this.config = config;
  }

  async fetchEntries(typeName, constraints = []) {
    const url = new URL(`${bubbleBaseUrl(this.config)}/${typeName}`);
    if (constraints.length > 0) url.searchParams.set('constraints', JSON.stringify(constraints));
    const response = await fetch(url, { headers: this.headers });
    await ensureOk(response, 'fetch Bubble entries');
    const payload = await response.json();
    return payload.response?.results ?? [];
  }

  async createEntry(typeName, entry) {
    const response = await fetch(`${bubbleBaseUrl(this.config)}/${typeName}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(entry),
    });
    await ensureOk(response, 'create Bubble entry');
    const payload = await response.json();
    return payload.response ?? entry;
  }

  async updateEntry(typeName, id, patch) {
    const response = await fetch(`${bubbleBaseUrl(this.config)}/${typeName}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(patch),
    });
    await ensureOk(response, 'update Bubble entry');
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.config.apiToken}`,
      'Content-Type': 'application/json',
    };
  }
}

const ensureOk = async (response, action) => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Unable to ${action}: ${response.status} ${body}`);
  }
};
