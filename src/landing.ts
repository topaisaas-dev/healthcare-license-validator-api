/**
 * Interactive Landing Page & Live Testing Workbench for Project 16
 * Healthcare Provider & Medical License Validator API
 */

export function renderInteractiveLanding(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Healthcare Provider & Medical License Validator API | TopAI SaaS</title>
  <meta name="description" content="Ultra-fast Healthcare Provider & Medical License Verification API. CMS NPI (Luhn 80840), EU RPPS, ADELI & NUCC Taxonomy validation on Cloudflare Edge.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #FFD600;
      --primary-hover: #E5C000;
      --bg: #090D16;
      --card-bg: #111827;
      --card-border: #1F2937;
      --text: #F3F4F6;
      --text-muted: #9CA3AF;
      --success: #10B981;
      --error: #EF4444;
      --info: #38BDF8;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      border-bottom: 1px solid var(--card-border);
      padding: 1.25rem 2rem;
      background: rgba(17, 24, 39, 0.8);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      color: var(--text);
    }
    .brand-icon {
      width: 42px;
      height: 42px;
      background: var(--primary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 800;
      font-size: 1.3rem;
      box-shadow: 0 4px 14px rgba(255, 214, 0, 0.25);
    }
    .brand-text h1 {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand-text p {
      font-size: 0.75rem;
      color: var(--primary);
      font-family: 'JetBrains Mono', monospace;
    }
    .header-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .btn-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    .btn-link:hover {
      color: var(--text);
    }
    .btn-cta {
      background: var(--primary);
      color: #000;
      text-decoration: none;
      padding: 0.5rem 1.1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 700;
      transition: all 0.2s;
    }
    .btn-cta:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    main {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      width: 100%;
    }
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background: rgba(255, 214, 0, 0.12);
      border: 1px solid rgba(255, 214, 0, 0.3);
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 9999px;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero h2 {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .hero p {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 760px;
      margin: 0 auto;
    }
    .workbench {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.75rem;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 860px) {
      .workbench {
        grid-template-columns: 1fr;
      }
    }
    .wb-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.75rem;
    }
    .wb-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.4rem 0.85rem;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.15s;
    }
    .wb-tab.active {
      background: rgba(255, 214, 0, 0.15);
      color: var(--primary);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }
    .form-control {
      width: 100%;
      background: #090D16;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 0.65rem 0.85rem;
      color: var(--text);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.15s;
    }
    .form-control:focus {
      border-color: var(--primary);
    }
    .sample-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.5rem;
    }
    .chip {
      background: #1F2937;
      color: var(--text-muted);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.725rem;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.15s;
    }
    .chip:hover {
      background: var(--primary);
      color: #000;
    }
    .btn-submit {
      width: 100%;
      background: var(--primary);
      color: #000;
      border: none;
      padding: 0.75rem;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    .btn-submit:hover {
      background: var(--primary-hover);
    }
    .response-pane {
      display: flex;
      flex-direction: column;
    }
    .response-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .response-header h3 {
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }
    .status-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: #1F2937;
      color: var(--text-muted);
    }
    .status-badge.live {
      background: rgba(16, 185, 129, 0.15);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .code-box {
      flex: 1;
      background: #090D16;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #38BDF8;
      max-height: 400px;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-top: 3.5rem;
    }
    .feat-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.5rem;
    }
    .feat-icon {
      font-size: 1.75rem;
      margin-bottom: 0.75rem;
    }
    .feat-card h4 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .feat-card p {
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    footer {
      border-top: 1px solid var(--card-border);
      padding: 2rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: 4rem;
    }
  </style>
</head>
<body>
  <header>
    <a href="/" class="brand">
      <div class="brand-icon">✚</div>
      <div class="brand-text">
        <h1>Healthcare Provider & License API</h1>
        <p>TopAI SaaS • Project 16</p>
      </div>
    </a>
    <div class="header-links">
      <a href="/openapi.json" class="btn-link" target="_blank">OpenAPI Spec</a>
      <a href="/v1/health" class="btn-link" target="_blank">Health</a>
      <a href="https://github.com/topaisaas-dev/healthcare-license-validator-api" class="btn-link" target="_blank">GitHub</a>
      <a href="https://rapidapi.com/topaisaasdev/api/healthcare-provider-medical-license-validator-api/pricing" class="btn-cta" target="_blank">Subscribe on RapidAPI</a>
    </div>
  </header>

  <main>
    <div class="hero">
      <div class="badge">Edge SLA • Sub-20ms • CMS NPPES & EU RPPS</div>
      <h2>Healthcare Provider & Medical License Verification API</h2>
      <p>Instant verification of US NPI (Luhn 80840), French RPPS & ADELI credentials, NUCC taxonomy classifications, and active license standing for Telemedicine, Insurtech & Digital Health platforms.</p>
    </div>

    <div class="workbench">
      <div class="controls-pane">
        <div class="wb-tabs">
          <button class="wb-tab active" onclick="switchMode('verify')">Credential Verification</button>
          <button class="wb-tab" onclick="switchMode('lookup')">NPI Lookup</button>
          <button class="wb-tab" onclick="switchMode('taxonomy')">Taxonomy Search</button>
        </div>

        <div id="form-verify">
          <div class="form-group">
            <label>NPI / RPPS / ADELI Identifier</label>
            <input type="text" id="v-id" class="form-control" value="1234567893" placeholder="10-digit NPI or 11-digit RPPS">
            <div class="sample-chips">
              <span class="chip" onclick="setVerify('1234567893', 'Dr. Gregory House', 'NJ', 'Cardiovascular Disease')">Dr. Gregory House (NJ)</span>
              <span class="chip" onclick="setVerify('1093783391', 'Johns Hopkins Hospital', 'MD', 'Hospital')">Johns Hopkins (MD)</span>
              <span class="chip" onclick="setVerify('1679500003', 'Mayo Clinic Hospital', 'MN', 'Hospital')">Mayo Clinic (MN)</span>
            </div>
          </div>
          <div class="form-group">
            <label>Provider / Practice Name (Optional)</label>
            <input type="text" id="v-name" class="form-control" value="Gregory House" placeholder="e.g. Gregory House">
          </div>
          <div class="form-group">
            <label>Jurisdiction / State (Optional)</label>
            <input type="text" id="v-state" class="form-control" value="NJ" placeholder="e.g. NJ, CA, NY">
          </div>
          <div class="form-group">
            <label>Specialty (Optional)</label>
            <input type="text" id="v-spec" class="form-control" value="Cardiology" placeholder="e.g. Cardiology, Pediatrics, Hospital">
          </div>
          <button class="btn-submit" onclick="executeVerify()">Verify Provider Credentials ➔</button>
        </div>

        <div id="form-lookup" style="display:none;">
          <div class="form-group">
            <label>NPI Number (10 Digits)</label>
            <input type="text" id="l-npi" class="form-control" value="1234567893" placeholder="Enter 10-digit NPI">
          </div>
          <button class="btn-submit" onclick="executeLookup()">Fetch CMS Registry Profile ➔</button>
        </div>

        <div id="form-taxonomy" style="display:none;">
          <div class="form-group">
            <label>Search Medical Specialty / NUCC Code</label>
            <input type="text" id="t-query" class="form-control" value="cardiology" placeholder="e.g. cardiology, hospital, neurology, 207Q">
          </div>
          <button class="btn-submit" onclick="executeTaxonomy()">Search Taxonomy Database ➔</button>
        </div>
      </div>

      <div class="response-pane">
        <div class="response-header">
          <h3>Live Edge Response</h3>
          <span id="res-badge" class="status-badge live">READY</span>
        </div>
        <pre id="json-output" class="code-box">// Select an action or click 'Verify Provider Credentials' to inspect real-time response payload...</pre>
      </div>
    </div>

    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon">⚡</div>
        <h4>Sub-1ms Luhn Checksum Engine</h4>
        <p>Validates US NPI 10-digit check digits (with Federal 80840 prefix constant), EU RPPS 11-digit numbers, and ADELI identifiers without external latency.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🏛️</div>
        <h4>CMS NPPES Registry Pipeline</h4>
        <p>Direct integration with CMS National Provider Identifier registry with sub-second failover and cached taxonomy resolution.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon">🛡️</div>
        <h4>Zero Clinical Liability</h4>
        <p>100% focused on B2B administrative verification, insurer billing eligibility, and credential fraud prevention without diagnostic advice.</p>
      </div>
    </div>
  </main>

  <footer>
    <p>© 2026 TopAI SaaS Dev • Powered by Cloudflare Workers Global Edge Serverless</p>
  </footer>

  <script>
    function switchMode(mode) {
      document.querySelectorAll('.wb-tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('form-verify').style.display = mode === 'verify' ? 'block' : 'none';
      document.getElementById('form-lookup').style.display = mode === 'lookup' ? 'block' : 'none';
      document.getElementById('form-taxonomy').style.display = mode === 'taxonomy' ? 'block' : 'none';
    }

    function setVerify(id, name, state, spec) {
      document.getElementById('v-id').value = id;
      document.getElementById('v-name').value = name;
      document.getElementById('v-state').value = state;
      document.getElementById('v-spec').value = spec;
    }

    async function executeVerify() {
      const id = document.getElementById('v-id').value.trim();
      const name = document.getElementById('v-name').value.trim();
      const state = document.getElementById('v-state').value.trim();
      const specialty = document.getElementById('v-spec').value.trim();
      const badge = document.getElementById('res-badge');
      const box = document.getElementById('json-output');

      badge.textContent = 'EXECUTING...';
      badge.className = 'status-badge';

      const t0 = performance.now();
      try {
        const res = await fetch('/v1/providers/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: id, name, state, specialty })
        });
        const data = await res.json();
        const latency = Math.round(performance.now() - t0);
        box.textContent = JSON.stringify(data, null, 2);
        badge.textContent = '200 OK (' + latency + 'ms)';
        badge.className = 'status-badge live';
      } catch (err) {
        box.textContent = JSON.stringify({ error: err.message }, null, 2);
        badge.textContent = 'ERROR';
      }
    }

    async function executeLookup() {
      const npi = document.getElementById('l-npi').value.trim();
      const badge = document.getElementById('res-badge');
      const box = document.getElementById('json-output');

      badge.textContent = 'EXECUTING...';
      badge.className = 'status-badge';

      const t0 = performance.now();
      try {
        const res = await fetch('/v1/providers/' + encodeURIComponent(npi));
        const data = await res.json();
        const latency = Math.round(performance.now() - t0);
        box.textContent = JSON.stringify(data, null, 2);
        badge.textContent = res.status + ' OK (' + latency + 'ms)';
        badge.className = res.ok ? 'status-badge live' : 'status-badge';
      } catch (err) {
        box.textContent = JSON.stringify({ error: err.message }, null, 2);
        badge.textContent = 'ERROR';
      }
    }

    async function executeTaxonomy() {
      const q = document.getElementById('t-query').value.trim();
      const badge = document.getElementById('res-badge');
      const box = document.getElementById('json-output');

      badge.textContent = 'EXECUTING...';
      badge.className = 'status-badge';

      const t0 = performance.now();
      try {
        const res = await fetch('/v1/taxonomy/search?query=' + encodeURIComponent(q));
        const data = await res.json();
        const latency = Math.round(performance.now() - t0);
        box.textContent = JSON.stringify(data, null, 2);
        badge.textContent = '200 OK (' + latency + 'ms)';
        badge.className = 'status-badge live';
      } catch (err) {
        box.textContent = JSON.stringify({ error: err.message }, null, 2);
        badge.textContent = 'ERROR';
      }
    }
  </script>
</body>
</html>`;
}
