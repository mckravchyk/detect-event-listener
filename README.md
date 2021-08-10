# detect-event-listener

Complete feature detection for addEventListener, including its third options parameter and passive events. 

## Installation

```bash
$ npm install --save detect-event-listener
```

## Usage

Include it and call the function once to do the feature detection.

```js
import { detectEventListener } from 'detect-event-listener';

const optionsSupport = detectEventListener();

/*
  {
    supportsEventListener: true,
    supportsOptions: true,
    supportsPassive: false,
    supportsOnce: false,
  }
*/
```

## Builds

The package is available in CommonJS, ESM and UMD (for linking in the browser). Every build targets ES5.

## TypeScript

The package is written in TypeScript, types are included.
