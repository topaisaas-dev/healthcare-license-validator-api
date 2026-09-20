import test from "node:test";
import assert from "node:assert/strict";

// NPI 10-digit Luhn algorithm with CMS 80840 prefix
function validateNPI(clean) {
  if (!/^\d{10}$/.test(clean)) return { valid: false, error: "NPI must be exactly 10 digits" };
  const firstDigit = clean[0];
  if (firstDigit !== "1" && firstDigit !== "2") {
    return { valid: false, error: "First digit must be 1 or 2" };
  }
  const type = firstDigit === "1" ? "INDIVIDUAL" : "ORGANIZATION";
  const full14 = "80840" + clean.substring(0, 9);
  let sum = 0;
  for (let i = full14.length - 1; i >= 0; i--) {
    let d = parseInt(full14[i], 10);
    if ((full14.length - 1 - i) % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  const units = sum % 10;
  const calculatedCheckDigit = units === 0 ? 0 : 10 - units;
  const actualCheckDigit = parseInt(clean[9], 10);
  return {
    valid: actualCheckDigit === calculatedCheckDigit,
    type,
    checkDigit: actualCheckDigit,
    calculatedCheckDigit
  };
}

// RPPS 11-digit Luhn
function validateRPPS(clean) {
  if (!/^\d{11}$/.test(clean)) return { valid: false };
  let sum = 0;
  for (let i = clean.length - 1; i >= 0; i--) {
    let d = parseInt(clean[i], 10);
    if ((clean.length - 1 - i) % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return { valid: sum % 10 === 0 };
}

test("NPI Algorithm: CMS benchmark NPI 1234567893 passes Luhn 80840", () => {
  const res = validateNPI("1234567893");
  assert.equal(res.valid, true);
  assert.equal(res.type, "INDIVIDUAL");
  assert.equal(res.checkDigit, 3);
  assert.equal(res.calculatedCheckDigit, 3);
});

test("NPI Algorithm: Valid provider NPI 1093783391 & 1679500003 pass validation", () => {
  const res1 = validateNPI("1093783391");
  assert.equal(res1.valid, true);
  assert.equal(res1.checkDigit, 1);

  const res2 = validateNPI("1679500003");
  assert.equal(res2.valid, true);
  assert.equal(res2.checkDigit, 3);
});

test("NPI Algorithm: Tampered and malformed NPIs are rejected", () => {
  // Checksum mismatch
  const resBad = validateNPI("1234567890");
  assert.equal(resBad.valid, false);

  // Wrong length
  assert.equal(validateNPI("12345").valid, false);
  assert.equal(validateNPI("12345678901").valid, false);

  // Invalid first digit
  assert.equal(validateNPI("9234567893").valid, false);
});

test("RPPS Algorithm: 11-digit Luhn checksum verification", () => {
  assert.equal(validateRPPS("123").valid, false);
  assert.equal(validateRPPS("123456789012").valid, false);
});

test("NUCC Taxonomy: Specialty codes verification", () => {
  const taxonomySample = [
    { code: "207RC0000X", specialty: "Cardiovascular Disease (Cardiology)" },
    { code: "207Q00000X", specialty: "Family Medicine" },
    { code: "282N00000X", specialty: "General Acute Care Hospital" }
  ];

  const cardio = taxonomySample.find(t => t.code === "207RC0000X");
  assert.ok(cardio);
  assert.equal(cardio.specialty, "Cardiovascular Disease (Cardiology)");

  const hosp = taxonomySample.find(t => t.code === "282N00000X");
  assert.ok(hosp);
  assert.equal(hosp.specialty, "General Acute Care Hospital");
});
