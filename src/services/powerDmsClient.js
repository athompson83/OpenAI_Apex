export class PowerDmsClient {
  constructor(config) {
    this.config = config;
  }

  async pullDocuments(updatedSince) {
    const url = new URL('/documents', this.config.baseUrl);
    if (updatedSince) url.searchParams.set('updatedSince', updatedSince);
    return this.request(url, { method: 'GET' });
  }

  async pushDocument(document) {
    return this.request(new URL('/documents', this.config.baseUrl), {
      method: 'POST',
      body: JSON.stringify(document),
    });
  }

  async updateDocument(id, patch) {
    return this.request(new URL(`/documents/${id}`, this.config.baseUrl), {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
  }

  async request(url, init) {
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'X-Organization-Id': this.config.organizationId ?? '',
        ...init.headers,
      },
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`PowerDMS Bridge request failed: ${response.status} ${body}`);
    }
    return response.json();
  }
}
