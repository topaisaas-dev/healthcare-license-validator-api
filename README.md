# 🩺 Healthcare Provider & Medical License Validator API

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Serverless-F38020?logo=cloudflare&logoColor=white)](https://healthcare-license-validator.topaisaas.workers.dev)
[![OpenAPI 3.0](https://img.shields.io/badge/OpenAPI-3.0_Spec-green?logo=openapi-initiative)](https://healthcare-license-validator.topaisaas.workers.dev/openapi.json)
[![Edge SLA](https://img.shields.io/badge/Edge_Latency-<25ms-FFD600?logo=lightning)](https://healthcare-license-validator.topaisaas.workers.dev/v1/health)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Ultra-fast Medical License, NPI & RPPS Credential Verification Engine** deployed on Cloudflare Workers global serverless edge. Instant validation for Telemedicine onboarding, Healthtech platforms, Insurtech billing claims, and Digital Pharmacy compliance.

---

## ⚡ Why Healthcare Provider Verification API?

Medical credential verification has historically been slow, fragmented, and prone to human error:
- **Telemedicine & Digital Health**: Must verify doctor identity, active license status, and practicing jurisdiction before allowing remote consultations.
- **Insurtech & Health Billing**: Claim rejections cost billions due to deactivated or mistyped NPI numbers and taxonomy mismatches.
- **Fraud & Impersonation Protection**: Algorithmic detection of invalid Luhn check digits, deactivation flags, and OIG-LEIE sanction risks.

This API delivers a **sub-25ms unified edge service** validating US CMS National Provider Identifiers (NPI), European RPPS/ADELI registries, and NUCC healthcare taxonomy classifications with **zero clinical liability**.

---

## 🚀 Key Features

- **⚡ Sub-1ms Luhn Checksum Algorithm**: Validates 10-digit US NPIs using the CMS Federal 15-digit Luhn standard (with `80840` prefix constant) and 11-digit EU RPPS identifiers without external latency.
- **🏛️ CMS NPPES Registry Integration**: Direct query against the official US CMS National Provider Identifier registry with failover caching and automated response normalization.
- **🇪🇺 French / European RPPS & ADELI Support**: Full format and checksum verification for French and EU healthcare practitioners (physicians, dentists, pharmacists, nurses).
- **🏷️ NUCC Taxonomy Index**: 40+ standardized healthcare taxonomy codes mapped to specialties, classifications, and provider types (Individual vs Organization).
- **🛡️ Multi-Point Verification Engine**: Evaluates practitioner name fuzzy match, jurisdiction consistency, specialty alignment, and returns an automated confidence score (0–100) and compliance risk rating (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
- **📦 High-Throughput Batch Processing**: Verify up to 50 practitioners in parallel in a single HTTP request for rapid bulk onboarding.

---

## 📡 API Endpoints

| Method | Path | Description |
|:---|:---|:---|
| `GET` | `/` | Interactive Test Workbench (HTML) or JSON descriptor |
| `GET` | `/v1/health` | Healthcheck, Edge uptime & registry connectivity |
| `GET` | `/openapi.json` | OpenAPI 3.0 specification |
| `GET` | `/v1/providers/validate-checksum?identifier=1234567893` | Instant algorithmic checksum validation (<1ms) |
| `GET` | `/v1/providers/:identifier` | Lookup provider profile by NPI |
| `POST` | `/v1/providers/verify` | Comprehensive multi-point credential verification |
| `POST` | `/v1/providers/batch-verify` | Bulk verification (up to 50 providers) |
| `GET` | `/v1/taxonomy/search?query=cardiology` | Search NUCC taxonomy codes and specialties |

---

## 💻 Quickstart Examples

### 1. Sub-1ms Checksum Validation (cURL)

```bash
curl -X GET "https://healthcare-license-validator.topaisaas.workers.dev/v1/providers/validate-checksum?identifier=1234567893"
```

**Response:**
```json
{
  "valid": true,
  "identifier": "1234567893",
  "identifierType": "NPI",
  "providerType": "INDIVIDUAL",
  "checkDigit": 3,
  "calculatedCheckDigit": 3
}
```

### 2. Comprehensive Credential Verification (Python)

```python
import requests

url = "https://healthcare-license-validator.topaisaas.workers.dev/v1/providers/verify"
payload = {
    "identifier": "1234567893",
    "name": "Dr. Gregory House",
    "state": "NJ",
    "specialty": "Cardiology"
}

response = requests.post(url, json=payload)
data = response.json()

print(f"Verified: {data['verified']}")
print(f"Confidence Score: {data['confidenceScore']}/100")
print(f"Compliance Risk: {data['details']['complianceRisk']}")
```

### 3. Provider Lookup (Node.js / TypeScript)

```typescript
const npi = "1234567893";
const res = await fetch(`https://healthcare-license-validator.topaisaas.workers.dev/v1/providers/${npi}`);
const profile = await res.json();

console.log("Provider:", profile.name.fullName);
console.log("Specialty:", profile.specialties[0].specialty);
console.log("Status:", profile.status);
```

---

## 💰 Subscription Plans (RapidAPI Standard)

| Plan | Monthly Requests | Rate Limit | Price | Excess Request Fee | Features |
|:---|:---:|:---:|:---:|:---:|:---|
| 🟢 **Basic (Free)** | 100 req / mo | 60 / min | **$0.00** | Hard limit | Checksum validation, Single lookup, Taxonomy search |
| 🔵 **Pro** | 5,000 req / mo | 300 / min | **$29.00** | $0.01 / req | Live CMS sync, Batch verification (up to 20), Edge cache |
| 🟣 **Ultra** | 25,000 req / mo | 600 / min | **$99.00** | $0.008 / req | High-throughput batch (up to 50), RPPS/ADELI, Priority edge SLA |
| 🔴 **Mega** | 100,000 req / mo | 1,200 / min | **$249.00** | $0.005 / req | Full enterprise throughput, Dedicated compliance logging, 24/7 SLA |

---

## 🔒 Security & Compliance

- **Zero Clinical Liability**: Exclusively processes administrative, regulatory, and public licensing directory data. No patient records, no protected health information (PHI), and no clinical diagnostic decisions.
- **SSRF & Anti-DDoS Protected**: Strict schema validation, rate limiting, and origin validation.
- **Serverless Edge Performance**: 100% executed on Cloudflare Workers edge nodes across 300+ global cities.

---

## 📄 License

MIT © [TopAI SaaS Dev](https://github.com/topaisaas-dev)
