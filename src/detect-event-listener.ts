/**
 * Detect browser support for addEventListener and its options
 *
 * Inspired by
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 *
 */
function detectEventListener() {
  const result = {
    supportsEventListener: false,
    supportsOptions: false,
    supportsPassive: false,
    supportsOnce: false,
  };

  // Detect if addEventListener is supported at all
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    result.supportsEventListener = true;
  } else {
    return result;
  }

  /**
   * Detect if supports capture and options argument at all
   *
   * 'capture' was the first available option in the spec, so if it's not supported,
   * options parameter is not supported at all
   */
  try {
    const options = {
      /**
       * This getter will be called if capture property is read
       */
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
    // Do nothing
  }

  if (!result.supportsOptions) {
    return result;
  }

  /**
   * Test if passive is supported
   */
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
    // Do nothing
  }

  /**
   * Test if once is supported
   */
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
    // Do nothing
  }

  return result;
}

export { detectEventListener };
