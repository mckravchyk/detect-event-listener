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

### Get browser build

To get a file which can be included on a webpage directly run the following command:

```bash
$ npm pack detect-event-listener
```

The package will be saved to the working directory, extract it, the `dist` directory will contain `detect-event-listener.js` and `detect-event-listener.min.js`

Alternatively you can clone this GitHub repository and run `npm run build`

## TypeScript

The package is written in TypeScript, types are included.
