import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('coverage/index.html', 'utf-8');
const $ = cheerio.load(html);

const stats = $('.wrapper .strong')
  .map((i, el) => $(el).text().trim())
  .get();

const [Statements, Branches, Functions, Lines] = stats;

const tableMarkdown = `| File | % Statements | % Branches | % Functions | % Lines |
|------|---------|---------|--------|--------|
| All files | ${Statements} | ${Branches} | ${Functions} | ${Lines} |`;

const coverageBadge = `![Coverage](https://img.shields.io/badge/Coverage-${Lines.replace(
  '%',
  ''
)}%25-brightgreen)`;

const readmePath = 'README.md';
let readme = fs.readFileSync(readmePath, 'utf-8');

const coverageTableRegex =
  /(<!-- COVERAGE-START -->)([\s\S]*?)(<!-- COVERAGE-END -->)/;
const badgeAboveHeaderRegex =
  /(<!-- COVERAGE-BADGE-START -->)[\s\S]*?(<!-- COVERAGE-BADGE-END -->)/;

const badgeBlock = `<!-- COVERAGE-BADGE-START -->\n${coverageBadge}\n<!-- COVERAGE-BADGE-END -->\n`;
const headerRegex = /(# Личный проект «Шесть городов»\s*)(\n|$)/;

if (coverageTableRegex.test(readme)) {
  readme = readme.replace(coverageTableRegex, `$1\n${tableMarkdown}\n$3`);
} else {
  readme += `\n<!-- COVERAGE-START -->\n${tableMarkdown}\n<!-- COVERAGE-END -->\n`;
}

if (badgeAboveHeaderRegex.test(readme)) {
  readme = readme.replace(badgeAboveHeaderRegex, badgeBlock);
} else {
  readme = `${badgeBlock}${readme}`;
}

fs.writeFileSync(readmePath, readme);
