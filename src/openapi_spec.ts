export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Healthcare Provider & Medical License Validator API",
    version: "1.0.0",
    description: "Production-grade medical credentialing & license verification engine for Telemedicine, Insurtech & Healthtech. Real-time CMS NPPES Registry integration, US NPI 10-digit Luhn check (HIPAA Federal 80840 standard), EU RPPS & ADELI validation, and NUCC Healthcare Taxonomy indexing.",
    contact: {
      name: "TopAI SaaS Dev",
      url: "https://github.com/topaisaas-dev"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: "https://healthcare-license-validator.topaisaas.workers.dev",
      description: "Cloudflare Edge Global Serverless Production"
    }
  ],
  paths: {
    "/v1/health": {
      get: {
        summary: "API Health & Edge SLA Status",
        description: "Returns real-time healthcheck, database status, and Cloudflare Edge latency.",
        responses: {
          "200": {
            description: "Service operational",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "healthy" },
                    service: { type: "string", example: "healthcare-license-validator" },
                    timestamp: { type: "string", example: "2026-09-20T20:45:00.000Z" },
                    uptime: { type: "number", example: 99.99 }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/providers/validate-checksum": {
      get: {
        summary: "Sub-1ms Checksum Validator (NPI / RPPS / ADELI)",
        description: "Instant mathematical Luhn algorithm validation without third-party network calls. Verifies 10-digit US NPI (CMS 80840 prefix), 11-digit EU RPPS, or 9-digit ADELI numbers.",
        parameters: [
          {
            name: "identifier",
            in: "query",
            required: true,
            description: "10-digit NPI, 11-digit RPPS, or 9-digit ADELI number",
            schema: { type: "string", example: "1234567893" }
          }
        ],
        responses: {
          "200": {
            description: "Checksum validation result",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    valid: { type: "boolean", example: true },
                    identifier: { type: "string", example: "1234567893" },
                    identifierType: { type: "string", example: "NPI" },
                    providerType: { type: "string", example: "INDIVIDUAL" },
                    checkDigit: { type: "number", example: 3 }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/providers/{identifier}": {
      get: {
        summary: "Lookup Provider Profile by Identifier",
        description: "Fetches complete healthcare provider profile including full legal name, active status, NUCC primary specialties, practice address, and license details.",
        parameters: [
          {
            name: "identifier",
            in: "path",
            required: true,
            description: "10-digit NPI or 11-digit RPPS identifier",
            schema: { type: "string", example: "1234567893" }
          }
        ],
        responses: {
          "200": {
            description: "Provider profile found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    npi: { type: "string", example: "1234567893" },
                    type: { type: "string", example: "INDIVIDUAL" },
                    status: { type: "string", example: "ACTIVE" },
                    name: { type: "object" },
                    specialties: { type: "array", items: { type: "object" } },
                    practiceAddress: { type: "object" },
                    source: { type: "string", example: "CMS_NPPES_LIVE" }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid identifier checksum"
          }
        }
      }
    },
    "/v1/providers/verify": {
      post: {
        summary: "Comprehensive Provider Credential Verification",
        description: "Multi-point verification engine cross-referencing NPI/RPPS, practitioner name, practicing jurisdiction (State/Dept), and specialty with automated compliance risk scoring.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["identifier"],
                properties: {
                  identifier: { type: "string", example: "1234567893" },
                  country: { type: "string", enum: ["US", "FR", "EU"], example: "US" },
                  name: { type: "string", example: "Gregory House" },
                  state: { type: "string", example: "NJ" },
                  specialty: { type: "string", example: "Cardiovascular Disease" },
                  licenseNumber: { type: "string", example: "MD-449102" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Verification completed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    verified: { type: "boolean", example: true },
                    status: { type: "string", example: "VERIFIED" },
                    confidenceScore: { type: "number", example: 95 },
                    details: { type: "object" },
                    alerts: { type: "array", items: { type: "string" } }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/providers/batch-verify": {
      post: {
        summary: "Batch Provider Verification (Up to 50)",
        description: "Enables parallel validation of up to 50 healthcare practitioners in a single HTTP request for onboarding workflows.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["providers"],
                properties: {
                  providers: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["identifier"],
                      properties: {
                        identifier: { type: "string" },
                        name: { type: "string" },
                        state: { type: "string" },
                        specialty: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Batch verification summary",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    total: { type: "number", example: 2 },
                    verifiedCount: { type: "number", example: 2 },
                    invalidCount: { type: "number", example: 0 },
                    results: { type: "array", items: { type: "object" } }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/taxonomy/search": {
      get: {
        summary: "Search NUCC Healthcare Provider Taxonomies",
        description: "Search official CMS NUCC taxonomy codes and specialty classifications by keyword or alphanumeric code.",
        parameters: [
          {
            name: "query",
            in: "query",
            required: false,
            description: "Keyword or partial taxonomy code (e.g. cardiology, hospital, 207Q)",
            schema: { type: "string", example: "cardiology" }
          }
        ],
        responses: {
          "200": {
            description: "Matching taxonomy entries",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    count: { type: "number", example: 1 },
                    results: { type: "array", items: { type: "object" } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
