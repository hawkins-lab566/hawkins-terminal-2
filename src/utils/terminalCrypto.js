const encoder = new TextEncoder();
const decoder = new TextDecoder();

const EXPECTED_RETURN_CODE_HASH = "1cc4c660d80f3452841386109deeaffe554f4fd47a5409f614bd6c1b53c78c65";

const ENCRYPTED_FINAL_FRAGMENT = {
  iv: "kro1z1L6TUqmvYtu",
  ciphertext: "irqtPEQQGKAOEsTNnHicuzOjxjhKzMs4x9oOkLvJbw=="
};

export function normalizeTerminalCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256(value) {
  return crypto.subtle.digest("SHA-256", encoder.encode(value));
}

async function getAesKeyFromCode(normalizedCode) {
  const digest = await sha256(normalizedCode);

  return crypto.subtle.importKey(
    "raw",
    digest,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
}

export async function unlockFinalFragment(returnCode) {
  const normalizedCode = normalizeTerminalCode(returnCode);
  const digest = await sha256(normalizedCode);
  const hash = bytesToHex(digest);

  if (hash !== EXPECTED_RETURN_CODE_HASH) {
    throw new Error("INVALID_RETURN_CODE");
  }

  const key = await getAesKeyFromCode(normalizedCode);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(ENCRYPTED_FINAL_FRAGMENT.iv) },
    key,
    base64ToBytes(ENCRYPTED_FINAL_FRAGMENT.ciphertext)
  );

  return decoder.decode(decrypted);
}
