export type EventListenerSupport = {
  supportsEventListener: boolean
  supportsOptions: boolean
  supportsPassive: boolean
  supportsOnce: boolean
}

/**
 * Detects support for addEventListener, including its third options parameter and passive events.
 *
 * Inspired by
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 *
 */
export function detectEventListener(): EventListenerSupport {
  const result = {
    supportsEventListener: false,
    supportsOptions: false,
    supportsPassive: false,
    supportsOnce: false,
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    result.supportsEventListener = true;
  } else {
    return result;
  }

  // Detect if options parameter is supported, by testing for capture property - which was in the
  // initial spec for options parameter.
  try {
    const options = {
      // This getter will be called when capture property is read
      get capture() {
        result.supportsOptions = true;
        return false;
      },
    };
    // @ts-ignore Allow null as callback
    window.addEventListener('test', null, options);
    // @ts-ignore
    window.removeEventListener('test', null, options);
  } catch (err) {
    // Catch
  }

  if (!result.supportsOptions) {
    return result;
  }

  try {
    const options = {
      get passive() {
        result.supportsPassive = true;
        return false;
      },
    };
    // @ts-ignore
    window.addEventListener('test', null, options);
    // @ts-ignore EventListenerOptions type is not up to date
    window.removeEventListener('test', null, options);
  } catch (err) {
    // Catch
  }

  try {
    const options = {
      get once() {
        result.supportsOnce = true;
        return false;
      },
    };
    // @ts-ignore
    window.addEventListener('test', null, options);
    // @ts-ignore
    window.removeEventListener('test', null, options);
  } catch (err) {
    // Catch
  }

  return result;
}
