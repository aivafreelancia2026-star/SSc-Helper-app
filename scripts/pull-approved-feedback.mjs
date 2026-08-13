#!/usr/bin/env node
// Pulls Founder-approved feedback items for this app (source="ssc-tutor")
// from AIVA Work Manager and writes each one's brief + reference screenshots
// to disk so a Claude Code session can read/view them directly.
//
// Usage: node scripts/pull-approved-feedback.mjs
// Requires WORK_MANAGER_USERNAME / WORK_MANAGER_PASSWORD in .env.local
// (Founder-role credentials — approval notes are Founder-only).

import { readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

loadEnvLocal(path.join(repoRoot, ".env.local"));

const BASE_URL = process.env.WORK_MANAGER_BASE_URL ?? "https://aiva-work-manager-by4q.onrender.com";
const USERNAME = process.env.WORK_MANAGER_USERNAME;
const PASSWORD = process.env.WORK_MANAGER_PASSWORD;
const OUT_DIR = path.join(repoRoot, ".feedback-sync");

// The feedback-widget.tsx source code comment claims "ssc-tutor", but the
// live Work Manager data for this app's tab is actually "ssc-helper" —
// verified directly against GET /api/feedback?product=ssc-helper. Use what
// the server actually has, not what the code comment says.
const PRODUCT = "ssc-helper";

async function main() {
  if (!USERNAME || !PASSWORD) {
    console.error(
      "Missing WORK_MANAGER_USERNAME / WORK_MANAGER_PASSWORD in .env.local. " +
        "These must be Founder-role credentials — approval notes are Founder-only."
    );
    process.exit(1);
  }

  const cookie = await login(BASE_URL, USERNAME, PASSWORD);

  const listRes = await fetch(
    `${BASE_URL}/api/feedback?product=${encodeURIComponent(PRODUCT)}&status=approved`,
    { headers: { Cookie: cookie } }
  );
  if (!listRes.ok) {
    throw new Error(`GET /api/feedback failed: ${listRes.status} ${await listRes.text()}`);
  }
  const { items } = await listRes.json();

  if (!items || items.length === 0) {
    console.log("No approved feedback items found.");
    return;
  }

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  let written = 0;
  for (const item of items) {
    const approvalRes = await fetch(`${BASE_URL}/api/feedback/${item.id}/approval`, {
      headers: { Cookie: cookie },
    });
    if (!approvalRes.ok) {
      throw new Error(
        `GET /api/feedback/${item.id}/approval failed: ${approvalRes.status} ${await approvalRes.text()}`
      );
    }
    const approval = await approvalRes.json();
    if (!approval) continue;

    const itemDir = path.join(OUT_DIR, String(item.id));
    mkdirSync(itemDir, { recursive: true });

    writeFileSync(itemDir + "/description.md", renderDescription(item, approval), "utf8");

    const images = approval.images ?? [];
    images.forEach((dataUrl, i) => {
      const decoded = decodeDataUrl(dataUrl);
      if (!decoded) return;
      writeFileSync(path.join(itemDir, `image-${i + 1}.${decoded.ext}`), decoded.buffer);
    });

    written += 1;
  }

  console.log(`Wrote ${written} approved feedback item(s) to ${OUT_DIR}`);
  console.log(items.map((i) => `  #${i.id} — ${i.category}`).join("\n"));
}

async function login(baseUrl, username, password) {
  const res = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  }

  const setCookies =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : [res.headers.get("set-cookie")].filter(Boolean);

  const sessionCookie = setCookies.map((c) => c.split(";")[0]).find((c) => c.startsWith("aiva_session="));
  if (!sessionCookie) {
    throw new Error("Login succeeded but no aiva_session cookie was returned.");
  }
  return sessionCookie;
}

function renderDescription(item, approval) {
  return `# Feedback #${item.id} — ${item.category}

## Founder's brief
${approval.description}

## Original submission
${item.message}

## Metadata
- category: ${item.category}
- rating: ${item.rating ?? "n/a"}
- pageUrl: ${item.pageUrl ?? "n/a"}
- appVersion: ${item.appVersion ?? "n/a"}
- platform: ${item.platform ?? "n/a"}
- submitterEmail: ${item.submitterEmail ?? "n/a"}
- createdAt: ${item.createdAt}
- approvedBy: ${approval.approvedBy}
- approvedAt: ${approval.approvedAt}
`;
}

function decodeDataUrl(dataUrl) {
  const match = /^data:image\/(\w+);base64,(.*)$/s.exec(dataUrl);
  if (!match) return null;
  const [, subtype, base64] = match;
  const ext = subtype === "jpeg" ? "jpg" : subtype;
  return { ext, buffer: Buffer.from(base64, "base64") };
}

function loadEnvLocal(filePath) {
  let content;
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return;
  }
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
