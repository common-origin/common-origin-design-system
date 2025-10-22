import { tokens } from '@common-origin/design-system/tokens';

console.log('✅ TOKENS IMPORT SUCCESS!');
console.log('Semantic exists:', !!tokens.semantic);
console.log('Typography exists:', !!tokens.semantic?.typography);
console.log('Typography sample:', tokens.semantic?.typography?.body || 'Not found');

// Test specific token path that was failing
console.log('Semantic typography keys:', Object.keys(tokens.semantic?.typography || {}));