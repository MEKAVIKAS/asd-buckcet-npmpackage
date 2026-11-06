# asd-buckcet-npmpackage

![CI](https://github.com/mekavikas/asd-buckcet-npmpackage/actions/workflows/ci.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/asd-buckcet-npmpackage)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![Node ≥18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

> A lightweight, zero-dependency JavaScript utility library for **string manipulation**, **array helpers**, and **type-safe value operations**. Designed for real-world Node.js projects.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [String Utilities](#string-utilities)
  - [Array Utilities](#array-utilities)
  - [Number / Value Utilities](#number--value-utilities)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install asd-buckcet-npmpackage
```

**Requirements:** Node.js ≥ 18

---

## Quick Start

```js
const {
  greet,
  titleCase,
  unique,
  chunk,
  clamp,
  defaultTo,
} = require('asd-buckcet-npmpackage');

console.log(greet('Vikas'));
// → Hello, Vikas! Welcome to ASD-Bucket.

console.log(titleCase('hello world'));
// → Hello World

console.log(unique([1, 2, 2, 3, 3]));
// → [1, 2, 3]

console.log(chunk([1, 2, 3, 4, 5], 2));
// → [[1, 2], [3, 4], [5]]

console.log(clamp(15, 0, 10));
// → 10

console.log(defaultTo(null, 'fallback'));
// → fallback
```

---

## API Reference

### String Utilities

---

#### `greet(name)` → `string`

Returns a personalised ASD-Bucket welcome greeting.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | The person's name (non-empty). |

```js
greet('Vikas');      // → 'Hello, Vikas! Welcome to ASD-Bucket.'
greet('  Alice  '); // → 'Hello, Alice! Welcome to ASD-Bucket.'
```

**Throws:** `TypeError` if `name` is not a string · `RangeError` if `name` is empty.

---

#### `greetMany(names)` → `string[]`

Greets an array of names, returning one greeting per entry.

| Parameter | Type | Description |
|-----------|------|-------------|
| `names` | `string[]` | Array of non-empty strings. |

```js
greetMany(['Vikas', 'Alice']);
// → ['Hello, Vikas! Welcome to ASD-Bucket.', 'Hello, Alice! Welcome to ASD-Bucket.']
```

**Throws:** `TypeError` if `names` is not an array.

---

#### `formatMessage(sender, message)` → `string`

Formats a labelled ASD-Bucket message string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `sender` | `string` | Sender's name. |
| `message` | `string` | Message body. |

```js
formatMessage('Vikas', 'Have a great day!');
// → '[ASD-Bucket] Vikas: Have a great day!'
```

**Throws:** `TypeError` if either argument is not a string.

---

#### `titleCase(str)` → `string`

Converts a string to Title Case (each word's first letter capitalised, rest lowercased).

```js
titleCase('hello world');     // → 'Hello World'
titleCase('JAVASCRIPT IS FUN'); // → 'Javascript Is Fun'
```

**Throws:** `TypeError` if `str` is not a string.

---

#### `reverseString(str)` → `string`

Reverses the characters in a string.

```js
reverseString('hello');   // → 'olleh'
reverseString('racecar'); // → 'racecar'
```

**Throws:** `TypeError` if `str` is not a string.

---

#### `wordCount(str)` → `number`

Counts the number of words in a string (splits on whitespace).

```js
wordCount('Hello world foo'); // → 3
wordCount('');                // → 0
```

**Throws:** `TypeError` if `str` is not a string.

---

#### `truncate(str, maxLength, [suffix='...'])` → `string`

Truncates `str` to `maxLength` characters, appending `suffix` if truncated.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `str` | `string` | — | Input string. |
| `maxLength` | `number` | — | Maximum allowed length (positive integer). |
| `suffix` | `string` | `'...'` | Appended when truncated. |

```js
truncate('Hello, World!', 7);       // → 'Hell...'
truncate('Hello, World!', 8, '…'); // → 'Hello, W…'
truncate('Hi', 10);                 // → 'Hi'
```

**Throws:** `TypeError` if `maxLength` is not a positive integer.

---

### Array Utilities

---

#### `unique(arr)` → `Array`

Removes duplicate values using SameValueZero equality.

```js
unique([1, 2, 2, 3, 3, 3]); // → [1, 2, 3]
unique(['a', 'b', 'a']);     // → ['a', 'b']
```

**Throws:** `TypeError` if `arr` is not an array.

---

#### `chunk(arr, size)` → `Array[]`

Splits an array into chunks of `size`.

```js
chunk([1, 2, 3, 4, 5], 2); // → [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4], 2);    // → [[1, 2], [3, 4]]
```

**Throws:** `TypeError` if `arr` is not an array · `RangeError` if `size < 1`.

---

#### `flatten(arr)` → `Array`

Shallow-flattens one level of nesting.

```js
flatten([[1, 2], [3, 4]]); // → [1, 2, 3, 4]
flatten([[1, [2]], [3]]);  // → [1, [2], 3]
```

**Throws:** `TypeError` if `arr` is not an array.

---

#### `shuffle(arr)` → `Array`

Returns a **new** shuffled copy (Fisher-Yates). The original array is not mutated.

```js
shuffle([1, 2, 3, 4]); // → e.g. [3, 1, 4, 2]
```

**Throws:** `TypeError` if `arr` is not an array.

---

### Number / Value Utilities

---

#### `clamp(value, min, max)` → `number`

Clamps `value` to the inclusive range [min, max].

```js
clamp(-5, 0, 10); // → 0
clamp(15, 0, 10); // → 10
clamp(5,  0, 10); // → 5
```

**Throws:** `TypeError` for non-finite numbers · `RangeError` if `min > max`.

---

#### `isNil(value)` → `boolean`

Returns `true` if `value` is `null` or `undefined`.

```js
isNil(null);      // → true
isNil(undefined); // → true
isNil(0);         // → false
isNil('');        // → false
```

---

#### `defaultTo(value, defaultValue)` → `*`

Returns `defaultValue` when `value` is `null` or `undefined`; otherwise returns `value`.

```js
defaultTo(null, 42);        // → 42
defaultTo(undefined, 'hi'); // → 'hi'
defaultTo(0, 42);           // → 0  (0 is not nil)
```

---

#### `randomInt(min, max)` → `number`

Returns a random integer in the inclusive range [min, max].

```js
randomInt(1, 6); // → e.g. 4
randomInt(5, 5); // → 5
```

**Throws:** `TypeError` for non-finite numbers · `RangeError` if `min > max`.

---

## Running Tests

```bash
npm test
# or for detailed spec output:
npm run test:verbose
```

The test suite uses Node.js's built-in `node:test` runner — **no extra dependencies required**.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a Pull Request.

Please ensure all tests pass and add tests for any new functionality.

---

## License

ISC © 2026 [Meka Vikas](https://github.com/mekavikas)
