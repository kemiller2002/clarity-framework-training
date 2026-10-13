// Declared surface and action inventory for visual-engineering/UI-LAYOUT-INTERACTION@1.0.0
// (ULI-A01, A02, A05, A10). Every enabled, visible action on every published
// page is listed here; site.spec.mjs fails when a page shows an action that
// is not declared, or a declared action is missing.
//
// An action is [name, destination]. All actions on this site are links; the
// destination is a page path or an in-page fragment. A name repeated within a
// landmark is declared once per instance.

const BRAND = Object.freeze(["Clarity Framework Training", "index.html"]);
const PRIVACY = Object.freeze(["Privacy", "privacy.html"]);

const SHORT_NAV = Object.freeze([
  ["Training", "training.html"], ["Boundaries", "boundaries.html"], ["About", "about.html"], ["Engage", "engage.html"]
]);
const LONG_NAV = Object.freeze([
  ["Training", "training.html"], ["Boundaries", "boundaries.html"], ["Teams & Cohorts", "teams.html"],
  ["FAQ", "faq.html"], ["About", "about.html"], ["Engage", "engage.html"]
]);
const CASES_NAV = Object.freeze([...LONG_NAV.slice(0, 3), ["Case Patterns", "case-patterns.html"], ...LONG_NAV.slice(3)]);
const HOME_NAV = Object.freeze([["Training", "#training"], ["Boundaries", "#boundaries"], ["About", "#about"], ["Engage", "#engage"]]);

const INVITE = Object.freeze(["Request an Invite", "engage.html"]);

const page = (path, heading, nav, cta, main, kind = "marketing") => Object.freeze({
  path,
  kind,
  heading,
  banner: Object.freeze([BRAND, ...nav, cta]),
  main: Object.freeze(main),
  contentinfo: Object.freeze([...nav, PRIVACY])
});

export const PAGES = Object.freeze([
  page("index.html", "Training for decision-makers who need shared reality, not reassurance.", HOME_NAV, ["Request an Invite", "#engage"], [
    ["Request an Invite", "#engage"], ["See who it’s for", "#fit"], ["Request an Invite", "#engage"],
    ["How the boundaries protect the work →", "#boundaries"], ["If these boundaries feel right, request an invite →", "#engage"]
  ]),
  page("about.html", "Why this exists", SHORT_NAV, INVITE, [["Read the boundaries", "boundaries.html"], INVITE]),
  page("boundaries.html", "Boundaries are part of the framework.", SHORT_NAV, INVITE, [
    INVITE, ["See the training model", "training.html"], ["If this scope fits, request an invite →", "engage.html"]
  ]),
  page("case-patterns.html", "Case patterns", CASES_NAV, INVITE, [
    ["Apply this to a real decision", "engage.html"], ["See how the training works", "training.html"]
  ]),
  page("engage.html", "Request an invite", SHORT_NAV, ["Request an Invite", "#form"], [
    ["See the intake", "#form"], ["Read the boundaries", "boundaries.html"]
  ]),
  page("faq.html", "FAQ", LONG_NAV, INVITE, [
    INVITE, ["Read the boundaries", "boundaries.html"], ["Choosing between private teams and cohorts →", "teams.html"],
    INVITE, ["Review the training model", "training.html"]
  ]),
  page("privacy.html", "Privacy Policy", LONG_NAV, ["Home", "index.html"], [
    ["Return home", "index.html"], ["Request an invite", "engage.html"]
  ]),
  page("teams.html", "Private teams or cohorts", LONG_NAV, INVITE, [
    INVITE, ["Read the FAQ", "faq.html"], ["Not sure which fits? The intake will sort it →", "engage.html"],
    INVITE, ["Reconfirm boundaries", "boundaries.html"]
  ]),
  page("training.html", "Not a course. A working session.", SHORT_NAV, INVITE, [
    INVITE, ["Read the boundaries", "boundaries.html"], ["Why boundaries matter", "boundaries.html"],
    ["Ready to apply it to a real decision →", "engage.html"]
  ]),
  page("404.html", "This page doesn’t exist.", LONG_NAV, ["Return Home", "index.html"], [
    ["Go to the homepage", "index.html"], ["Request an invite", "engage.html"], ["How the training works", "training.html"],
    ["Framework boundaries", "boundaries.html"], ["Private teams vs cohorts", "teams.html"], ["Frequently asked questions", "faq.html"]
  ], "other")
]);

export const LANDMARKS = Object.freeze(["banner", "main", "contentinfo"]);

export const headingOf = path => PAGES.find(entry => entry.path === path)?.heading;

// Group repeated [name, destination] pairs: { name, destination, count }.
export const groupActions = actions => Object.values(actions.reduce((groups, [name, destination]) => {
  const key = `${name}\u0000${destination}`;
  return { ...groups, [key]: { name, destination, count: (groups[key]?.count ?? 0) + 1 } };
}, {}));

// Peer button pairs that share a row (ULI-L02, L07, L10). The first name is
// unique on its page; its parent container scopes the partner, which may
// repeat elsewhere on the page.
export const BUTTON_PAIRS = Object.freeze([
  ["index.html", "See who it’s for", "Request an Invite"],
  ["about.html", "Read the boundaries", "Request an Invite"],
  ["boundaries.html", "See the training model", "Request an Invite"],
  ["case-patterns.html", "See how the training works", "Apply this to a real decision"],
  ["engage.html", "See the intake", "Read the boundaries"],
  ["faq.html", "Read the boundaries", "Request an Invite"],
  ["faq.html", "Review the training model", "Request an Invite"],
  ["privacy.html", "Return home", "Request an invite"],
  ["teams.html", "Read the FAQ", "Request an Invite"],
  ["teams.html", "Reconfirm boundaries", "Request an Invite"],
  ["training.html", "Read the boundaries", "Request an Invite"],
  ["404.html", "Go to the homepage", "Request an invite"]
]);
