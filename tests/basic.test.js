import test from 'node:test';
import assert from 'node:assert/strict';
import { cognitoConfigured } from '../src/auth/cognito.js';
import { claudeConfigured } from '../src/ai/claude.js';

test('Cognito is reported unconfigured when required environment values are missing', () => {
  const keys = ['AWS_REGION', 'COGNITO_USER_POOL_ID', 'COGNITO_CLIENT_ID'];
  const previous = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  keys.forEach(k => delete process.env[k]);
  assert.equal(cognitoConfigured(), false);
  keys.forEach(k => previous[k] === undefined ? delete process.env[k] : process.env[k] = previous[k]);
});

test('Claude integration is reported unconfigured without an API key', () => {
  const previous = process.env.ANTHROPIC_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
  assert.equal(claudeConfigured(), false);
  if (previous !== undefined) process.env.ANTHROPIC_API_KEY = previous;
});
