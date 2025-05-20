# @full-pack/string-builder

[![npm](https://img.shields.io/npm/v/@full-pack/string-builder.svg)](https://www.npmjs.com/package/@full-pack/string-builder)

[![codecov](https://codecov.io/gh/full-pack/string-builder/graph/badge.svg?token=SSEPV5BS4C)](https://codecov.io/gh/full-pack/string-builder)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/jestjs/jest) [![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A lightweight and versatile String Utility Package for Node.js & Browser.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">


## Installation
```sh
npm install @full-pack/string-builder
```

### CommonJS(require)

```js
const { ... } = require('@full-pack/string-builder');
```

### ESM(import)

```js
import { ... } from '@full-pack/string-builder';
```

## APIs

### Class: StringBuilder

### Data Members

- capacity: number
- length: number

### Methods

```ts
insert(index: number, value: number | string | boolean, repeatCount?: number): boolean;
append(value: number | string | boolean, repeatCount?: number): boolean;
prepend(value: number | string | boolean, repeatCount?: number): boolean;
appendNewLine(num?: number): boolean;
prependNewLine(num?: number): boolean;
appendSpace(num?: number): boolean;
prependSpace(num?: number): boolean;
appendArray(arr: Array<number | string | boolean>, separator?: string): boolean;
prependArray(arr: Array<number | string | boolean>, separator?: string): boolean;
appendJSON(json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>, space?: string | number): boolean;
prependJSON(json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>, space?: string | number): boolean;
appendCodePoint(...codePoints: number[]): boolean;
prependCodePoint(...codePoints: number[]): boolean;
replaceSubstring(str: string | Replacer, start?: number, end?: number): boolean;
setString(value: string): boolean;
getString(): string;
indexOf(searchString: string, position?: number): number;
lastIndexOf(searchString: string, position?: number): number;
setChar(index: number, char: string): string;
substring(start: number, end?: number): string;
trim(): void;
clear(): void;
reset(): void;
clone(): StringBuilder;
isFull(): boolean;
isEmpty(): boolean;
```

### Class: ChainableStringBuilder

### Data Members

- capacity: number
- length: number

### Methods

```ts    
insert(index: number, value: number | string | boolean, repeatCount?: number): ChainableStringBuilder;
append(value: number | string | boolean, repeatCount?: number): ChainableStringBuilder;
prepend(value: number | string | boolean, repeatCount?: number): ChainableStringBuilder;
appendNewLine(num?: number): ChainableStringBuilder;
prependNewLine(num?: number): ChainableStringBuilder;
appendSpace(num?: number): ChainableStringBuilder;
prependSpace(num?: number): ChainableStringBuilder;
appendArray(arr: Array<number | string | boolean>, separator?: string): ChainableStringBuilder;
prependArray(arr: Array<number | string | boolean>, separator?: string): ChainableStringBuilder;
appendJSON(json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>, space?: string | number): ChainableStringBuilder;
prependJSON(json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>, space?: string | number): ChainableStringBuilder;
appendCodePoint(...codePoints: number[]): ChainableStringBuilder;
prependCodePoint(...codePoints: number[]): ChainableStringBuilder;
replaceSubstring(str: string | Replacer, start?: number, end?: number): ChainableStringBuilder;
setString(value: string): ChainableStringBuilder;
trim(): ChainableStringBuilder;
clear(): ChainableStringBuilder;
reset(): ChainableStringBuilder;
clone(): ChainableStringBuilder;
build(): StringBuilder;
getString(): string;
```

Full documentation [here](https://full-pack.github.io/string-builder)

## Build

```
npm run build
```

## License

The MIT License. Full License is [here](LICENSE)
