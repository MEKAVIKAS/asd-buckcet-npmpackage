/**
 * @module asd-buckcet-npmpackage
 * @description A lightweight, reusable JavaScript utility library for string
 *   manipulation, array helpers, and type-safe value operations.
 *
 * @author Meka Vikas <e25b070538@adypu.edu.in>
 * @license ISC
 */

'use strict';

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

/**
 * @private
 * Asserts that `value` is a non-empty string, throwing TypeError otherwise.
 */
function _requireString(value, fnName, paramName = 'argument') {
  if (typeof value !== 'string') {
    throw new TypeError(
      `[asd-buckcet] ${fnName}(): "${paramName}" must be a string. Received ${typeof value}.`
    );
  }
}

/**
 * @private
 * Asserts that `value` is an array, throwing TypeError otherwise.
 */
function _requireArray(value, fnName, paramName = 'argument') {
  if (!Array.isArray(value)) {
    throw new TypeError(
      `[asd-buckcet] ${fnName}(): "${paramName}" must be an array. Received ${typeof value}.`
    );
  }
}

/**
 * @private
 * Asserts that `value` is a finite number, throwing TypeError otherwise.
 */
function _requireNumber(value, fnName, paramName = 'argument') {
  if (typeof value !== 'number' || !isFinite(value)) {
    throw new TypeError(
      `[asd-buckcet] ${fnName}(): "${paramName}" must be a finite number. Received ${value}.`
    );
  }
}

// ─────────────────────────────────────────────
// String Utilities
// ─────────────────────────────────────────────

/**
 * Returns a personalised ASD-Bucket welcome greeting.
 *
 * @param {string} name - The person's name (non-empty).
 * @returns {string} Greeting message.
 * @throws {TypeError} If `name` is not a string.
 * @throws {RangeError} If `name` is an empty / whitespace-only string.
 *
 * @example
 * greet('Vikas'); // → 'Hello, Vikas! Welcome to ASD-Bucket.'
 */
function greet(name) {
  _requireString(name, 'greet', 'name');
  if (name.trim() === '') {
    throw new RangeError('[asd-buckcet] greet(): "name" must not be empty or whitespace.');
  }
  return `Hello, ${name.trim()}! Welcome to ASD-Bucket.`;
}

/**
 * Returns an array of greeting strings for each name supplied.
 *
 * @param {string[]} names - Array of non-empty strings.
 * @returns {string[]} Array of greeting messages.
 * @throws {TypeError} If `names` is not an array.
 *
 * @example
 * greetMany(['Vikas', 'Alice']); // → ['Hello, Vikas! ...', 'Hello, Alice! ...']
 */
function greetMany(names) {
  _requireArray(names, 'greetMany', 'names');
  return names.map((name) => greet(name));
}

/**
 * Returns a formatted ASD-Bucket message string.
 *
 * @param {string} sender  - Sender's name.
 * @param {string} message - Message body.
 * @returns {string} Formatted message.
 * @throws {TypeError} If either argument is not a string.
 *
 * @example
 * formatMessage('Vikas', 'Hello!'); // → '[ASD-Bucket] Vikas: Hello!'
 */
function formatMessage(sender, message) {
  _requireString(sender, 'formatMessage', 'sender');
  _requireString(message, 'formatMessage', 'message');
  return `[ASD-Bucket] ${sender.trim()}: ${message.trim()}`;
}

/**
 * Converts a string to Title Case (each word's first letter capitalised).
 *
 * @param {string} str - Input string.
 * @returns {string} Title-cased string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * titleCase('hello world'); // → 'Hello World'
 */
function titleCase(str) {
  _requireString(str, 'titleCase', 'str');
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Reverses the characters in a string.
 *
 * @param {string} str - Input string.
 * @returns {string} Reversed string.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * reverseString('hello'); // → 'olleh'
 */
function reverseString(str) {
  _requireString(str, 'reverseString', 'str');
  return str.split('').reverse().join('');
}

/**
 * Counts the number of words in a string.
 *
 * @param {string} str - Input string.
 * @returns {number} Word count.
 * @throws {TypeError} If `str` is not a string.
 *
 * @example
 * wordCount('Hello world foo'); // → 3
 */
function wordCount(str) {
  _requireString(str, 'wordCount', 'str');
  const trimmed = str.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Truncates a string to `maxLength` characters, appending `suffix` if truncated.
 *
 * @param {string} str       - Input string.
 * @param {number} maxLength - Maximum allowed length (inclusive).
 * @param {string} [suffix='...'] - Suffix to append when truncated.
 * @returns {string} Truncated string.
 * @throws {TypeError} If `str` is not a string or `maxLength` is not a positive integer.
 *
 * @example
 * truncate('Hello, World!', 7); // → 'Hell...'
 */
function truncate(str, maxLength, suffix = '...') {
  _requireString(str, 'truncate', 'str');
  _requireString(suffix, 'truncate', 'suffix');
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new TypeError('[asd-buckcet] truncate(): "maxLength" must be a positive integer.');
  }
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

// ─────────────────────────────────────────────
// Array Utilities
// ─────────────────────────────────────────────

/**
 * Removes duplicate values from an array (uses SameValueZero equality).
 *
 * @param {Array} arr - Input array.
 * @returns {Array} New array with duplicates removed.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * unique([1, 2, 2, 3]); // → [1, 2, 3]
 */
function unique(arr) {
  _requireArray(arr, 'unique', 'arr');
  return [...new Set(arr)];
}

/**
 * Splits an array into smaller arrays ("chunks") of a fixed size.
 *
 * @param {Array}  arr  - Input array.
 * @param {number} size - Size of each chunk (positive integer).
 * @returns {Array[]} Array of chunk arrays.
 * @throws {TypeError} If `arr` is not an array.
 * @throws {RangeError} If `size` is not a positive integer.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // → [[1, 2], [3, 4], [5]]
 */
function chunk(arr, size) {
  _requireArray(arr, 'chunk', 'arr');
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError('[asd-buckcet] chunk(): "size" must be a positive integer.');
  }
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Flattens a nested array by one level (shallow flatten).
 *
 * @param {Array} arr - Input (possibly nested) array.
 * @returns {Array} Shallow-flattened array.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * flatten([[1, 2], [3, [4]]]); // → [1, 2, 3, [4]]
 */
function flatten(arr) {
  _requireArray(arr, 'flatten', 'arr');
  return arr.flat();
}

/**
 * Returns a new array with elements shuffled using the Fisher-Yates algorithm.
 *
 * @param {Array} arr - Input array (not mutated).
 * @returns {Array} New shuffled array.
 * @throws {TypeError} If `arr` is not an array.
 *
 * @example
 * shuffle([1, 2, 3, 4]); // → e.g. [3, 1, 4, 2]
 */
function shuffle(arr) {
  _requireArray(arr, 'shuffle', 'arr');
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─────────────────────────────────────────────
// Number / Value Utilities
// ─────────────────────────────────────────────

/**
 * Clamps a number within a [min, max] range.
 *
 * @param {number} value - The number to clamp.
 * @param {number} min   - Minimum bound (inclusive).
 * @param {number} max   - Maximum bound (inclusive).
 * @returns {number} Clamped value.
 * @throws {TypeError} If any argument is not a finite number.
 * @throws {RangeError} If `min` is greater than `max`.
 *
 * @example
 * clamp(15, 0, 10); // → 10
 * clamp(-5, 0, 10); // → 0
 * clamp(5, 0, 10);  // → 5
 */
function clamp(value, min, max) {
  _requireNumber(value, 'clamp', 'value');
  _requireNumber(min, 'clamp', 'min');
  _requireNumber(max, 'clamp', 'max');
  if (min > max) {
    throw new RangeError(`[asd-buckcet] clamp(): "min" (${min}) must not exceed "max" (${max}).`);
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @param {*} value - Any value.
 * @returns {boolean}
 *
 * @example
 * isNil(null);      // → true
 * isNil(undefined); // → true
 * isNil(0);         // → false
 */
function isNil(value) {
  return value === null || value === undefined;
}

/**
 * Returns `defaultValue` when `value` is `null` or `undefined`; otherwise returns `value`.
 *
 * @param {*} value        - Value to test.
 * @param {*} defaultValue - Fallback value.
 * @returns {*}
 *
 * @example
 * defaultTo(null, 42); // → 42
 * defaultTo(7, 42);    // → 7
 */
function defaultTo(value, defaultValue) {
  return isNil(value) ? defaultValue : value;
}

/**
 * Generates a random integer in the range [min, max] (both inclusive).
 *
 * @param {number} min - Minimum value (integer).
 * @param {number} max - Maximum value (integer).
 * @returns {number} Random integer.
 * @throws {TypeError} If `min` or `max` is not a finite number.
 * @throws {RangeError} If `min` is greater than `max`.
 *
 * @example
 * randomInt(1, 6); // → e.g. 4
 */
function randomInt(min, max) {
  _requireNumber(min, 'randomInt', 'min');
  _requireNumber(max, 'randomInt', 'max');
  if (min > max) {
    throw new RangeError(`[asd-buckcet] randomInt(): "min" (${min}) must not exceed "max" (${max}).`);
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

module.exports = {
  // String
  greet,
  greetMany,
  formatMessage,
  titleCase,
  reverseString,
  wordCount,
  truncate,
  // Array
  unique,
  chunk,
  flatten,
  shuffle,
  // Number / value
  clamp,
  isNil,
  defaultTo,
  randomInt,
};
