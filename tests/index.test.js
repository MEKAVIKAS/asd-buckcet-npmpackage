/**
 * tests/index.test.js
 * Full unit-test suite for asd-buckcet-npmpackage using Node's built-in test runner.
 * Run with:  npm test   OR   node --test tests/index.test.js
 */

'use strict';

const { test } = require('node:test');
const assert   = require('node:assert/strict');

const {
  greet,
  greetMany,
  formatMessage,
  titleCase,
  reverseString,
  wordCount,
  truncate,
  unique,
  chunk,
  flatten,
  clamp,
  isNil,
  defaultTo,
  randomInt,
} = require('../src/index');

// ─────────────────────────────────────────────
// greet()
// ─────────────────────────────────────────────
test('greet — returns correct greeting', () => {
  assert.equal(greet('Vikas'), 'Hello, Vikas! Welcome to ASD-Bucket.');
});

test('greet — trims surrounding whitespace from name', () => {
  assert.equal(greet('  Alice  '), 'Hello, Alice! Welcome to ASD-Bucket.');
});

test('greet — throws TypeError for non-string input', () => {
  assert.throws(() => greet(123), TypeError);
  assert.throws(() => greet(null), TypeError);
  assert.throws(() => greet(undefined), TypeError);
});

test('greet — throws RangeError for empty / whitespace-only name', () => {
  assert.throws(() => greet(''), RangeError);
  assert.throws(() => greet('   '), RangeError);
});

// ─────────────────────────────────────────────
// greetMany()
// ─────────────────────────────────────────────
test('greetMany — greets multiple names', () => {
  assert.deepEqual(greetMany(['Vikas', 'Alice']), [
    'Hello, Vikas! Welcome to ASD-Bucket.',
    'Hello, Alice! Welcome to ASD-Bucket.',
  ]);
});

test('greetMany — returns empty array for empty input', () => {
  assert.deepEqual(greetMany([]), []);
});

test('greetMany — throws TypeError for non-array input', () => {
  assert.throws(() => greetMany('Vikas'), TypeError);
  assert.throws(() => greetMany(null), TypeError);
});

// ─────────────────────────────────────────────
// formatMessage()
// ─────────────────────────────────────────────
test('formatMessage — formats correctly', () => {
  assert.equal(formatMessage('Vikas', 'Hello!'), '[ASD-Bucket] Vikas: Hello!');
});

test('formatMessage — trims sender and message', () => {
  assert.equal(formatMessage(' Vikas ', ' Hello! '), '[ASD-Bucket] Vikas: Hello!');
});

test('formatMessage — throws TypeError for non-string arguments', () => {
  assert.throws(() => formatMessage(1, 'msg'), TypeError);
  assert.throws(() => formatMessage('name', 2), TypeError);
});

// ─────────────────────────────────────────────
// titleCase()
// ─────────────────────────────────────────────
test('titleCase — converts to title case', () => {
  assert.equal(titleCase('hello world'), 'Hello World');
});

test('titleCase — handles all-caps input', () => {
  assert.equal(titleCase('JAVASCRIPT IS FUN'), 'Javascript Is Fun');
});

test('titleCase — single word', () => {
  assert.equal(titleCase('hello'), 'Hello');
});

test('titleCase — throws TypeError for non-string', () => {
  assert.throws(() => titleCase(42), TypeError);
});

// ─────────────────────────────────────────────
// reverseString()
// ─────────────────────────────────────────────
test('reverseString — reverses a string', () => {
  assert.equal(reverseString('hello'), 'olleh');
});

test('reverseString — empty string returns empty string', () => {
  assert.equal(reverseString(''), '');
});

test('reverseString — palindrome stays same', () => {
  assert.equal(reverseString('racecar'), 'racecar');
});

test('reverseString — throws TypeError for non-string', () => {
  assert.throws(() => reverseString(null), TypeError);
});

// ─────────────────────────────────────────────
// wordCount()
// ─────────────────────────────────────────────
test('wordCount — counts words correctly', () => {
  assert.equal(wordCount('Hello world foo'), 3);
});

test('wordCount — empty string returns 0', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('   '), 0);
});

test('wordCount — single word', () => {
  assert.equal(wordCount('hello'), 1);
});

test('wordCount — throws TypeError for non-string', () => {
  assert.throws(() => wordCount(123), TypeError);
});

// ─────────────────────────────────────────────
// truncate()
// ─────────────────────────────────────────────
test('truncate — truncates long string with default suffix', () => {
  assert.equal(truncate('Hello, World!', 7), 'Hell...');
});

test('truncate — does not truncate when string fits', () => {
  assert.equal(truncate('Hi', 10), 'Hi');
});

test('truncate — uses custom suffix', () => {
  // maxLength=8, suffix='…' (1 char) → slice(0,7) = 'Hello, ' + '…' = 'Hello, …'
  assert.equal(truncate('Hello, World!', 8, '…'), 'Hello, …');
});

test('truncate — throws TypeError for invalid maxLength', () => {
  assert.throws(() => truncate('hello', 0), TypeError);
  assert.throws(() => truncate('hello', -1), TypeError);
  assert.throws(() => truncate('hello', 'five'), TypeError);
});

// ─────────────────────────────────────────────
// unique()
// ─────────────────────────────────────────────
test('unique — removes duplicate numbers', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 3, 3]), [1, 2, 3]);
});

test('unique — removes duplicate strings', () => {
  assert.deepEqual(unique(['a', 'b', 'a']), ['a', 'b']);
});

test('unique — already-unique array unchanged', () => {
  assert.deepEqual(unique([1, 2, 3]), [1, 2, 3]);
});

test('unique — throws TypeError for non-array', () => {
  assert.throws(() => unique('hello'), TypeError);
});

// ─────────────────────────────────────────────
// chunk()
// ─────────────────────────────────────────────
test('chunk — splits array into size-2 chunks', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('chunk — splits evenly', () => {
  assert.deepEqual(chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
});

test('chunk — size equals array length', () => {
  assert.deepEqual(chunk([1, 2, 3], 3), [[1, 2, 3]]);
});

test('chunk — throws RangeError for size < 1', () => {
  assert.throws(() => chunk([1, 2], 0), RangeError);
  assert.throws(() => chunk([1, 2], -1), RangeError);
});

test('chunk — throws TypeError for non-array', () => {
  assert.throws(() => chunk('abc', 1), TypeError);
});

// ─────────────────────────────────────────────
// flatten()
// ─────────────────────────────────────────────
test('flatten — shallow flattens one level', () => {
  assert.deepEqual(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4]);
});

test('flatten — does not deep-flatten beyond one level', () => {
  assert.deepEqual(flatten([[1, [2]], [3]]), [1, [2], 3]);
});

test('flatten — throws TypeError for non-array', () => {
  assert.throws(() => flatten('abc'), TypeError);
});

// ─────────────────────────────────────────────
// clamp()
// ─────────────────────────────────────────────
test('clamp — clamps value below min', () => {
  assert.equal(clamp(-5, 0, 10), 0);
});

test('clamp — clamps value above max', () => {
  assert.equal(clamp(15, 0, 10), 10);
});

test('clamp — leaves in-range value unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('clamp — throws TypeError for non-numeric arguments', () => {
  assert.throws(() => clamp('a', 0, 10), TypeError);
  assert.throws(() => clamp(5, '0', 10), TypeError);
});

test('clamp — throws RangeError when min > max', () => {
  assert.throws(() => clamp(5, 10, 0), RangeError);
});

// ─────────────────────────────────────────────
// isNil()
// ─────────────────────────────────────────────
test('isNil — returns true for null', () => {
  assert.equal(isNil(null), true);
});

test('isNil — returns true for undefined', () => {
  assert.equal(isNil(undefined), true);
});

test('isNil — returns false for 0, "", false, NaN', () => {
  assert.equal(isNil(0), false);
  assert.equal(isNil(''), false);
  assert.equal(isNil(false), false);
  assert.equal(isNil(NaN), false);
});

// ─────────────────────────────────────────────
// defaultTo()
// ─────────────────────────────────────────────
test('defaultTo — returns defaultValue for null', () => {
  assert.equal(defaultTo(null, 42), 42);
});

test('defaultTo — returns defaultValue for undefined', () => {
  assert.equal(defaultTo(undefined, 'fallback'), 'fallback');
});

test('defaultTo — returns original value when not nil', () => {
  assert.equal(defaultTo(7, 42), 7);
  assert.equal(defaultTo(0, 42), 0);
  assert.equal(defaultTo(false, true), false);
});

// ─────────────────────────────────────────────
// randomInt()
// ─────────────────────────────────────────────
test('randomInt — returns integer within range', () => {
  for (let i = 0; i < 100; i++) {
    const r = randomInt(1, 6);
    assert.ok(r >= 1 && r <= 6, `Expected 1 ≤ ${r} ≤ 6`);
    assert.ok(Number.isInteger(r), `Expected integer, got ${r}`);
  }
});

test('randomInt — works when min === max', () => {
  assert.equal(randomInt(5, 5), 5);
});

test('randomInt — throws RangeError when min > max', () => {
  assert.throws(() => randomInt(10, 1), RangeError);
});

test('randomInt — throws TypeError for non-numeric arguments', () => {
  assert.throws(() => randomInt('1', 6), TypeError);
});
