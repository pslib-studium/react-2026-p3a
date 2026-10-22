// Generates Moodle XML from 02-otazky.md. Usage: node build-xml.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const SRC = join(dir, '02-otazky.md');
const OUT = join(dir, 'test-react-p3a.moodle.xml');
const ROOT_CATEGORY = '$course$/top/React p3a';

const escHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline markdown (code spans, *italic*) -> HTML
function inline(md, { codeTags = true } = {}) {
  let out = '';
  let last = 0;
  const re = /(`+) ?([\s\S]*?) ?\1(?!`)/g;
  let m;
  while ((m = re.exec(md))) {
    out += escHtml(md.slice(last, m.index).replace(/\*([^*]+)\*/g, '$1'));
    out += codeTags ? `<code>${escHtml(m[2])}</code>` : escHtml(m[2]);
    last = re.lastIndex;
  }
  out += escHtml(md.slice(last).replace(/\*([^*]+)\*/g, '$1'));
  return out;
}

const cdata = (s) => `<![CDATA[${s}]]>`;
const textEl = (html) => `<text>${cdata(html)}</text>`;

function stemToHtml(lines) {
  const html = [];
  let para = [];
  const flush = () => {
    if (para.length) html.push(`<p>${para.map((l) => inline(l)).join('<br>')}</p>`);
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      flush();
      const code = [];
      for (i++; i < lines.length && !lines[i].startsWith('```'); i++) code.push(lines[i]);
      html.push(`<pre><code>${escHtml(code.join('\n'))}</code></pre>`);
    } else if (line.trim() === '') {
      flush();
    } else {
      para.push(line);
    }
  }
  flush();
  return html.join('\n');
}

function parse(md) {
  const lines = md.split(/\r?\n/);
  const questions = [];
  let category = null;
  let topic = null;
  let q = null;
  const finish = () => {
    if (q) questions.push(q);
    q = null;
  };
  for (const line of lines) {
    let m;
    if ((m = line.match(/^# (K\d.*)$/))) {
      finish();
      category = m[1].trim();
    } else if ((m = line.match(/^## (T\d+.*)$/))) {
      finish();
      topic = m[1].trim();
    } else if ((m = line.match(/^### (T\d+-\d+) \[(\w+)\] (.*)$/))) {
      finish();
      if (!category) continue;
      q = { id: m[1], type: m[2], title: m[3].trim(), category, topic, body: [] };
    } else if (/^#{1,2} |^---\s*$/.test(line)) {
      finish();
    } else if (q) {
      q.body.push(line);
    }
  }
  finish();
  return questions;
}

function splitBody(body) {
  const stem = [];
  const options = [];
  const rows = [];
  let choices = [];
  let distractors = [];
  let inCode = false;
  for (const line of body) {
    if (line.startsWith('```')) inCode = !inCode;
    let m;
    if (!inCode && (m = line.match(/^- \[( |x)\] (.*)$/))) {
      options.push({ correct: m[1] === 'x', text: m[2] });
    } else if (!inCode && line.startsWith('|')) {
      rows.push(line);
    } else if (!inCode && line.startsWith('Volby:')) {
      choices = [...line.matchAll(/(\d+)\. (`+) ?(.+?) ?\2(?!`)/g)].map((x) => x[3]);
    } else if (!inCode && /^Distraktory?:/.test(line)) {
      distractors = [...line.matchAll(/\*([^*]+)\*/g)].map((x) => x[1]);
    } else {
      stem.push(line);
    }
  }
  const pairs = rows
    .slice(2)
    .map((r) => r.replace(/^\|/, '').replace(/\|\s*$/, '').split(' | ').map((c) => c.trim()));
  return { stem, options, pairs, choices, distractors };
}

const header = (q, type, html) => `  <question type="${type}">
    <name>${textEl(`${q.id} ${q.title}`.replace(/`/g, ''))}</name>
    <questiontext format="html">${textEl(html)}</questiontext>
    <generalfeedback format="html"><text></text></generalfeedback>
    <defaultgrade>1</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>`;

const combinedFeedback = `    <correctfeedback format="html"><text>Správně.</text></correctfeedback>
    <partiallycorrectfeedback format="html"><text>Částečně správně.</text></partiallycorrectfeedback>
    <incorrectfeedback format="html"><text>Nesprávně.</text></incorrectfeedback>
    <shownumcorrect/>`;

function fractionFor(k) {
  const map = { 1: '100', 2: '50', 3: '33.33333', 4: '25', 5: '20' };
  if (!map[k]) throw new Error(`Unsupported number of answers for fraction: ${k}`);
  return map[k];
}

function toXml(q) {
  const { stem, options, pairs, choices, distractors } = splitBody(q.body);
  const html = stemToHtml(stem);
  const fail = (msg) => {
    throw new Error(`${q.id}: ${msg}`);
  };
  if (!html.includes('<p>')) fail('question text must contain a prompt, not only code');

  if (q.type === 'MC1' || q.type === 'MCn') {
    const correct = options.filter((o) => o.correct).length;
    if (options.length < 3) fail('too few options');
    if (q.type === 'MC1' && correct !== 1) fail('MC1 needs exactly one correct option');
    if (q.type === 'MCn' && correct < 2) fail('MCn needs at least two correct options');
    const frac = fractionFor(correct);
    // Wrong options sum to -100 % so selecting everything scores 0.
    const wrongFrac = q.type === 'MCn' ? `-${fractionFor(options.length - correct)}` : '0';
    const answers = options
      .map(
        (o) => `    <answer fraction="${o.correct ? frac : wrongFrac}" format="html">
      ${textEl(inline(o.text))}
      <feedback format="html"><text></text></feedback>
    </answer>`,
      )
      .join('\n');
    return `${header(q, 'multichoice', html)}
    <single>${q.type === 'MC1' ? 'true' : 'false'}</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <showstandardinstruction>0</showstandardinstruction>
${combinedFeedback}
${answers}
  </question>`;
  }

  if (q.type === 'MATCH') {
    if (pairs.length < 2) fail('MATCH needs at least two pairs');
    if (pairs.some((p) => p.length !== 2)) fail('MATCH row must have exactly two cells');
    const subs = pairs
      .map(
        ([left, right]) => `    <subquestion format="html">
      ${textEl(inline(left))}
      <answer>${textEl(inline(right, { codeTags: false }))}</answer>
    </subquestion>`,
      )
      .concat(
        distractors.map(
          (d) => `    <subquestion format="html">
      <text></text>
      <answer>${textEl(inline(d, { codeTags: false }))}</answer>
    </subquestion>`,
        ),
      )
      .join('\n');
    return `${header(q, 'match', html)}
    <shuffleanswers>true</shuffleanswers>
${combinedFeedback}
${subs}
  </question>`;
  }

  if (q.type === 'GAP' || q.type === 'DD') {
    const gaps = [...html.matchAll(/\[\[(\d+)\]\]/g)].map((x) => Number(x[1]));
    const maxGap = Math.max(...gaps);
    if (choices.length <= maxGap) fail('needs distractors beyond gap choices');
    if (new Set(gaps).size !== gaps.length) fail('each gap number must be used once');
    const tag = q.type === 'GAP' ? 'selectoption' : 'dragbox';
    const opts = choices
      .map((c) => `    <${tag}>\n      ${textEl(escHtml(c))}\n      <group>1</group>\n    </${tag}>`)
      .join('\n');
    return `${header(q, q.type === 'GAP' ? 'gapselect' : 'ddwtos', html)}
    <shuffleanswers>1</shuffleanswers>
${combinedFeedback}
${opts}
  </question>`;
  }

  fail(`unknown type ${q.type}`);
}

const questions = parse(readFileSync(SRC, 'utf8'));
const parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<quiz>'];
let currentCategory = null;
const stats = {};
for (const q of questions) {
  if (q.category !== currentCategory) {
    currentCategory = q.category;
    parts.push(`  <question type="category">
    <category><text>${ROOT_CATEGORY}/${escHtml(q.category)}</text></category>
    <info format="html"><text></text></info>
  </question>`);
  }
  parts.push(toXml(q));
  stats[q.category] = (stats[q.category] ?? 0) + 1;
}
parts.push('</quiz>', '');
writeFileSync(OUT, parts.join('\n'), 'utf8');
console.log(stats, 'total:', questions.length);
