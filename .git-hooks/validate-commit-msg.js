#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const msgFile = process.argv[2];
if (!msgFile) {
  console.error('Usage: validate-commit-msg.js <commit-msg-file>');
  process.exit(1);
}

const msg = readFileSync(msgFile, 'utf8').trim();
const config = JSON.parse(readFileSync(resolve(root, 'commit-convention.json'), 'utf8'));

const { scopes, types, rules } = config;
const { scopeCaseSensitive, minDescriptionLength } = rules;

// Skip merge commits and fixup commits
if (msg.startsWith('Merge ') || msg.startsWith('fixup!') || msg.startsWith('squash!')) {
  process.exit(0);
}

// Expected format: [SCOPE] type: description
const pattern = /^\[([^\]]+)\] (\w+): (.+)$/;
const match = msg.match(pattern);

if (!match) {
  console.error(`
  ✗ Invalid commit message format.

  Expected: [SCOPE] type: short description
  Got:      "${msg}"

  Examples:
    [global] chore: fix vercel build config
    [CPU] feat: add IDE view panel
    [Sudoku] fix: validate duplicate row values
`);
  process.exit(1);
}

const [, scope, type, description] = match;

const validScope = scopeCaseSensitive
  ? scopes.includes(scope)
  : scopes.map(s => s.toLowerCase()).includes(scope.toLowerCase());

if (!validScope) {
  console.error(`
  ✗ Invalid scope: "${scope}"

  Allowed scopes (commit-convention.json): ${scopes.join(', ')}
`);
  process.exit(1);
}

if (!types.includes(type)) {
  console.error(`
  ✗ Invalid type: "${type}"

  Allowed types (commit-convention.json): ${types.join(', ')}
`);
  process.exit(1);
}

if (description.length < (minDescriptionLength ?? 3)) {
  console.error(`
  ✗ Description too short (min ${minDescriptionLength} chars): "${description}"
`);
  process.exit(1);
}

process.exit(0);
