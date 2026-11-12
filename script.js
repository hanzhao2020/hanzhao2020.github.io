"use strict";

// Build content as text rather than HTML so profile edits are safe by default.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function safeUrl(value) {
  if (!value || typeof value !== "string") return null;
  try {
    const url = new URL(value, document.baseURI);
    return ["http:", "https:", "mailto:", "file:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
function link(item, className) {
  const url = safeUrl(item.url);
  if (!url) return null;
  const a = element("a", className, item.label);
  a.href = url;
  if (/^https?:/.test(url) && new URL(url).origin !== location.origin) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}
document.title = `${profile.name} · Computational Mechanics`;
for (const key of ["name", "initials", "role", "affiliation", "location"]) {
  document.querySelectorAll(`[data-${key}]`).forEach(node => { node.textContent = profile[key]; });
}
const portrait = document.querySelector("#portrait");
portrait.src = safeUrl(profile.portrait) || "assets/portrait.svg";
portrait.alt = profile.portraitAlt || `Portrait of ${profile.name}`;
document.querySelector("#portrait-caption").hidden = profile.portrait !== "assets/portrait.svg";
profile.bio.forEach(text => document.querySelector("#bio").append(element("p", "", text)));
const socials = document.querySelector("#social-links");
profile.links.forEach(item => { const a = link(item); if (a) socials.append(a); });
const cvUrl = safeUrl(profile.cv);
const cvProfileLink = link({ label: "Curriculum vitae ↗", url: profile.cv });
if (cvProfileLink) socials.append(cvProfileLink);
document.querySelectorAll("[data-cv-link]").forEach(a => {
  if (cvUrl) a.href = cvUrl;
  else a.hidden = true;
});
profile.news.forEach(item => {
  const row = element("div", "news-row");
  row.append(element("span", "news-date", item.date), element("p", "", item.text));
  document.querySelector("#news-list").append(row);
});
profile.publications.forEach((item, i) => {
  const article = element("article", "publication");
  article.dataset.type = item.type;
  const body = element("div", "publication-body");
  const authors = element("p", "authors");
  item.authors.split(/(H\. Zhao)/g).forEach(part => authors.append(part === "H. Zhao" ? element("strong", "", part) : document.createTextNode(part)));
  body.append(element("h3", "", item.title), authors, element("p", "venue", item.venue));
  const actions = element("div", "publication-actions");
  (item.links || []).forEach(item => { const a = link(item, "paper-link"); if (a) actions.append(a); });
  if (item.abstract) {
    const details = element("details");
    details.append(element("summary", "", "Abstract"), element("p", "abstract-text", item.abstract));
    actions.append(details);
  }
  body.append(actions);
  article.append(element("span", "publication-number", String(i + 1).padStart(2, "0")), body, element("span", "publication-year", item.year));
  document.querySelector("#publication-list").append(article);
});
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    let visible = 0;
    document.querySelectorAll(".publication").forEach(article => {
      article.hidden = button.dataset.filter !== "all" && article.dataset.type !== button.dataset.filter;
      if (!article.hidden) visible++;
    });
    document.querySelector("#empty-publications").hidden = visible !== 0;
  });
});
function renderTimeline(items, selector) {
items.forEach(item => {
  const row = element("article", "timeline-item");
  const body = element("div");
  body.append(element("h3", "", item.organization), element("p", "position", item.role), element("p", "description", item.description));
  row.append(element("p", "dates", item.dates), body);
  document.querySelector(selector).append(row);
});
}
profile.experience.forEach(item => {
  const row = element("article", "education-item");
  const body = element("div");
  body.append(element("h3", "", item.organization), element("p", "position", item.role));
  row.append(body, element("p", "dates", item.dates));
  document.querySelector("#employment-list").append(row);
});
renderTimeline(profile.experience, "#experience-list");
if (profile.research?.length) {
  const university = element("article", "timeline-item university-research");
  const body = element("div");
  body.append(element("h3", "", "University of California San Diego"), element("p", "position", "Graduate Research Assistant"));
  const projects = element("div", "research-projects");
  profile.research.forEach(item => {
    const project = element("section", "research-project");
    project.append(element("h4", "", item.organization), element("p", "dates", item.dates), element("p", "position", item.role), element("p", "description", item.description));
    projects.append(project);
  });
  body.append(projects);
  university.append(element("p", "dates", "NOV 2019 — SEP 2024"), body);
  document.querySelector("#experience-list").append(university);
}
renderTimeline(profile.service || [], "#service-list");
profile.education.forEach(item => {
  const row = element("article", "education-item");
  const body = element("div");
  body.append(element("h3", "", item.institution), element("p", "position", item.degree), element("p", "description", item.detail));
  row.append(body, element("p", "dates", item.dates));
  document.querySelector("#education-list").append(row);
});
document.querySelector("#teaching-description").textContent = profile.teachingDescription || "";
function renderRecords(items, selector) {
  items.forEach(item => {
    const row = element("article", "record-item");
    const body = element("div");
    body.append(element("h3", "", item.title));
    if (item.detail) body.append(element("p", "description", item.detail));
    row.append(body, element("p", "dates", item.dates));
    document.querySelector(selector).append(row);
  });
}
renderRecords(profile.teaching || [], "#teaching-list");
renderRecords(profile.awards || [], "#awards-list");
(profile.reviewing || []).forEach(text => document.querySelector("#reviewing-list").append(element("li", "", text)));
document.querySelector("#personal-note").textContent = profile.personalNote;
document.querySelector("#personal-note").hidden = !profile.personalNote;
document.querySelector("#year").textContent = new Date().getFullYear();
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
  if (!visible) return;
  navLinks.forEach(a => {
    const active = a.hash === `#${visible.target.id}`;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
}, { rootMargin: "-12% 0px -55% 0px", threshold: 0 });
document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
