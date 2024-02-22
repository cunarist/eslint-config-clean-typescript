# `eslint-config-clean-typescript`

[![NPM Version](https://img.shields.io/npm/v/eslint-config-clean-typescript)](https://www.npmjs.com/package/eslint-config-clean-typescript)

**Enforce classic JavaScript syntax in TypeScript codebase by banning excessive keywords**

Though TypeScript has brought us type-safety for web development, many developers agree on that it has too many duplicated keywords and ways of writing code to achieve the same thing.

Not only that, TypeScript is not a standard web language. It might be hard to refactor the code once alternatives such as [the type annotation proposal for JavaScript](https://github.com/tc39/proposal-type-annotations) arise, if the codebase contains too much TypeScript-specific syntax.

This package is an opinionated ESLint configuration. The basic principle is not to declare things that don't exist in JavaScript. By doing so, TypeScript can be more coherent with JavaScript, while assisting only in areas that are related to type safety.

## Table of Contents

- [`eslint-config-clean-typescript`](#eslint-config-clean-typescript)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Rules](#rules)
    - [Class Based Types](#class-based-types)
    - [No Type Aliases](#no-type-aliases)
    - [No Namespaces](#no-namespaces)
    - [Array Type Annotations](#array-type-annotations)

## Installation

This guide assumes that you're inside your Node project directory [with `package.json`](https://docs.npmjs.com/cli/v8/commands/npm-init).

Additionally, this configuration relies on [`eslint`](https://github.com/eslint/eslint) and [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint). You should have `.eslintrc.js` or similar in your project folder, by following the exact steps introduced in the [`eslint` docs](https://eslint.org/docs/latest/use/getting-started) and [`typescript-eslint` docs](https://typescript-eslint.io/getting-started/).

Once the prerequisites are ready, install this configuration.

```bash
npm install --save-dev eslint-config-clean-typescript
```

Then, add this configuration to `.eslintrc.js` or similar.

```javascript
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "eslint-config-clean-typescript" // ADD THIS LINE
  ]
}
```

## Rules

### Class Based Types

- ⭕ `class`
- ❌ `interface`

Whether to use `type`, `interface`, or `class` to represent a typed structure has been a long-standing controversy in the TypeScript community.

This is related to the historical path of TypeScript, where the `interface` keyword was introduced in 2012, when JavaScript `class` keyword was not a thing yet. The JavaScript `class` keyword was introduced later in 2015.

This configuration makes your codebase use only `class` for types, to adhere to classic JavaScript way of doing object-oriented programming.

```typescript
// Produces warning.
enum MyEnum {
  A = "west",
  B = "east",
}

// Produces warning.
interface MyInterface {
  a: number;
  b: string;
}
```

```typescript
// OK.
class MyEnum {
  static A = "west";
  static B = "east";
}

// OK.
class MyInterface {
  a: number;
  b: string;
}
```

Consider using optional types such as `number | undefined` for fields that can be empty or extended. This is equivalent to TypeScript's `Omit` or `Pick`.

```typescript
class MyClass {
  a?: number; // number | undefined
  b?: string; // string | undefined
}
```

### No Type Aliases

- ❌ `type`

Type statements are ghost declarations that don't actually exist in JavaScript.

```typescript
// Produces warning.
type ShapeType = { a: boolean; b: boolean };

// Produces warning.
type AliasType = Array<string>;

function myFunction(array: AliasType) {
  console.log(array);
}
```

```typescript
function myFunction(array: Array<string>) {
  console.log(array);
}
```

### No Namespaces

- ❌ `namespace`

ES6 modules should be used instead of namespaces. TypeScript was heavily influced by C++ and C#, and the `namespace` keyword doesn't align well with JavaScript practices. This rule is also included in `typescript-eslint`'s recommended configuration.

```typescript
// Produces warning.
namespace MyNamespace {}
```

### Array Type Annotations

- ⭕ `Array<T>`
- ❌ `T[]`

Preferring `Array<T>` over `T[]` is for ensuring alignment with high-level language paradigm, particularly in the context of JavaScript development.

Although `T[]` may be more familiar to developers from lower-level languages like C, C++, and Rust, where arrays represent contiguous memory spaces, it does not really make sense for high-level languages like JavaScript.

In contrast, `Array<T>` provides a more explicit and descriptive representation of the `Array` type in JavaScript. This clarity is particularly beneficial for developers collaborating on projects, as it reduces ambiguity and aids in understanding the constructor and prototype of an array.

```typescript
// Produces warning.
const array: number[] = [1, 2, 3];
```

```typescript
// OK.
const array: Array<number> = [1, 2, 3];
```
