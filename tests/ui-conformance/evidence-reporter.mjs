// Playwright reporter that turns this run's results into a
// visual-engineering/UI-LAYOUT-INTERACTION@1.0.0 evidence document and
// validates it against the pinned schema (fixtures/ui-conformance.schema.json,
// see fixtures/PROVENANCE.json). Statuses come only from test outcomes:
// a test that did not run is "unknown", never "pass". An invalid document
// fails the run.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);
const SCHEMA_URL = new URL("./fixtures/ui-conformance.schema.json", import.meta.url);
const PROVENANCE_URL = new URL("./fixtures/PROVENANCE.json", import.meta.url);
const OUTPUT = process.env.UI_CONFORMANCE_EVIDENCE ?? "test-results/ui-conformance-evidence.json";

// Routes GitHub Pages publishes that this local runner cannot reproduce:
// Markdown rendered by the Pages Jekyll build.
const UNREPRODUCED_ROUTES = Object.freeze(["readme.html / README.html", "why-clarity-is-necessary.html", "training-dandd/faq.html"]);

const STATUS_OF = Object.freeze({ passed: "pass", failed: "fail", timedOut: "fail", interrupted: "unknown", skipped: "unknown" });

const worst = statuses =>
  statuses.length === 0 ? "unassessed"
    : statuses.includes("fail") ? "fail"
      : statuses.includes("unknown") ? "unknown"
        : "pass";

const parse = annotation => {
  try { return JSON.parse(annotation.description); } catch { return annotation.description; }
};

const revision = () => {
  try { return process.env.GITHUB_SHA ?? execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(); } catch { return "unknown-revision"; }
};

const validator = () => {
  const Ajv2020 = require("ajv/dist/2020").default;
  const bytes = readFileSync(SCHEMA_URL);
  const provenance = JSON.parse(readFileSync(PROVENANCE_URL, "utf8"));
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (digest !== provenance.source.sha256) throw new Error(`Vendored schema digest ${digest} does not match PROVENANCE.json`);
  // strictTypes is relaxed only because the upstream schema's if/then branches
  // add minItems without restating type "array" (a style lint, not semantics).
  const validate = new Ajv2020({ allErrors: true, strict: true, strictTypes: false }).compile(JSON.parse(bytes.toString("utf8")));
  return document => (validate(document) ? [] : validate.errors.map(error => `${error.instancePath || "/"} ${error.message}`));
};

const recordOf = (test, result) => {
  const annotations = [...test.annotations, ...result.annotations];
  const of = type => annotations.filter(item => item.type === type).map(parse);
  return {
    title: test.titlePath().slice(1).join(" › "),
    status: STATUS_OF[result.status] ?? "unknown",
    surfaces: of("surface"),
    viewports: of("viewport").map(Number),
    actions: of("action"),
    alignments: of("alignment")
  };
};

const surfaceKind = path => (path === "404.html" || path === "boundries.html" ? "other" : "marketing");

export const buildEvidence = (records, { repository, revision: rev }) => {
  const paths = [...new Set(records.flatMap(record => record.surfaces))].sort();
  const surfaces = paths.map(path => {
    const own = records.filter(record => record.surfaces.includes(path));
    const status = worst(own.map(record => record.status));
    const merge = (key, toItem) => Object.values(own.flatMap(record => record[key].map(item => [item.id, toItem(item, record)]))
      .reduce((items, [id, item]) => ({ ...items, [id]: items[id] ? { ...items[id], status: worst([items[id].status, item.status]), evidence: [...items[id].evidence, ...item.evidence] } : item }), {}));
    const actions = merge("actions", (item, record) => ({ ...item, status: record.status, evidence: [record.title] }));
    const alignmentGroups = merge("alignments", (item, record) => ({ ...item, toleranceCssPx: 1, status: record.status, evidence: [`${record.status}: ${record.title}`] }))
      .map(({ status: _status, ...group }) => group);
    const unknown = own.filter(record => record.status !== "pass").map(record => `${record.status}: ${record.title}`);
    return {
      id: `site:${path}`,
      path,
      kind: surfaceKind(path),
      status,
      viewportWidths: [...new Set(own.flatMap(record => record.viewports))].sort((a, b) => a - b),
      alignmentGroups,
      actions,
      evidence: own.map(record => `${record.status}: ${record.title}`),
      ...(unknown.length ? { unknownScope: unknown } : {})
    };
  });
  return {
    standardVersion: "1.0.0",
    repository,
    revision: rev,
    classification: "site-ui",
    surfaces: [
      ...surfaces,
      ...UNREPRODUCED_ROUTES.map(path => ({
        id: `site:${path}`, path, kind: "other", status: "unknown", viewportWidths: [], alignmentGroups: [], actions: [],
        unknownScope: ["Rendered from Markdown by the GitHub Pages Jekyll build; not reproduced by the local static server, so not assessed."]
      }))
    ],
    exceptions: [],
    notes: "Chromium only. Right-to-left and translated text are not applicable today (English-only content, lang=en) and unassessed. Generated by tests/ui-conformance/evidence-reporter.mjs."
  };
};

export default class EvidenceReporter {
  constructor() { this.records = []; }

  onTestEnd(test, result) { this.records = [...this.records, recordOf(test, result)]; }

  onEnd() {
    const document = buildEvidence(this.records, { repository: "kemiller2002/clarity-framework-training", revision: revision() });
    const errors = validator()(document);
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, `${JSON.stringify(document, null, 2)}\n`);
    const counts = document.surfaces.reduce((totals, surface) => ({ ...totals, [surface.status]: (totals[surface.status] ?? 0) + 1 }), {});
    console.log(`UI conformance evidence: ${OUTPUT} (surfaces ${JSON.stringify(counts)})`);
    if (errors.length) {
      console.error(`Evidence does not validate against ui-conformance.schema.json:\n${errors.join("\n")}`);
      return { status: "failed" };
    }
    return undefined;
  }
}
