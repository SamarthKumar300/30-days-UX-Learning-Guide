const fs = require('fs');
const path = require('path');

let cachedCorpus = null;

function readFile(name) {
  return fs.readFileSync(path.join(process.cwd(), name), 'utf8');
}

function normalize(text) {
  return text.replace(/\r/g, '').replace(/\u2014/g, '-').replace(/\u2013/g, '-');
}

function chunkByHeading(text, fileName) {
  const normalized = normalize(text);
  const lines = normalized.split('\n');
  const chunks = [];
  let current = null;

  function pushCurrent() {
    if (!current) return;
    const content = current.lines.join('\n').trim();
    if (content) {
      chunks.push({
        id: `${fileName}:${current.title}`,
        source: fileName,
        label: current.label,
        text: content,
      });
    }
  }

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      pushCurrent();
      const title = match[1].trim();
      const dayMatch = title.match(/^Day\s+(\d+):\s+(.+)$/);
      current = {
        title,
        label: dayMatch ? `Day ${dayMatch[1]} - ${dayMatch[2]}` : title,
        lines: [],
      };
      continue;
    }
    if (current) current.lines.push(line);
  }

  pushCurrent();
  return chunks;
}

function buildCorpus() {
  if (cachedCorpus) return cachedCorpus;

  const files = [
    { name: 'Day-wise-content.md', weight: 4 },
    { name: 'V2-guidebook-plan.md', weight: 2 },
    { name: 'PDF-coverage-audit.md', weight: 3 },
  ];

  const chunks = files.flatMap(file =>
    chunkByHeading(readFile(file.name), file.name).map(chunk => ({
      ...chunk,
      weight: file.weight,
      searchText: `${chunk.label}\n${chunk.text}`.toLowerCase(),
    }))
  );

  cachedCorpus = chunks;
  return cachedCorpus;
}

function scoreChunk(chunk, queryTerms, context) {
  let score = chunk.weight;
  for (const term of queryTerms) {
    if (chunk.searchText.includes(term)) score += term.length > 4 ? 3 : 1;
  }
  if (context.day && chunk.label.toLowerCase().includes(`day ${context.day}`)) score += 8;
  if (context.week && chunk.label.toLowerCase().includes(`week ${context.week}`)) score += 4;
  if (context.page === 'references.html' && chunk.source === 'PDF-coverage-audit.md') score += 5;
  return score;
}

function retrieveRelevantChunks(message, context) {
  const corpus = buildCorpus();
  const queryTerms = normalize(message)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term.length >= 3)
    .slice(0, 24);

  return corpus
    .map(chunk => ({ ...chunk, score: scoreChunk(chunk, queryTerms, context) }))
    .filter(chunk => chunk.score > chunk.weight)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

module.exports = {
  retrieveRelevantChunks,
};
