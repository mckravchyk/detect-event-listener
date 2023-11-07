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
