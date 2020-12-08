/**
 * Detect whether the browser supports passive events
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 */
function getEventListenerOptionsSupport() {
  const result = {
    supportsOptions: false,
    supportsPassive: false,
    supportsOnce: false,
  };

  /**
   * Test if supports capture and options argument at all
   *
   * Capture was the first option in the spec, so if it's not supported,
   * option argument is also not supported
   */
  try {
    const options = {
      /**
       * This getter function will be called when the browser
       * attempts to access the capture property.
       */
      get capture() {
        result.supportsOptions = true;
        return false;
      },
    };
    // @ts-ignore
    window.addEventListener('test', null, options);
    // @ts-ignore
    window.removeEventListener('test', null, options);
  } catch (err) {
    result.supportsOptions = false;
  }

  // No point in further checks if options are not supported
  if (!result.supportsOptions) {
    // EXIT
    return result;
  }

  /**
   * Test if passive is supported
   */
  try {
    const options = {
      /**
       * This getter function will be called when the browser
       * attempts to access the passive property.
       */
      get passive() {
        result.supportsPassive = true;
        return false;
      },
    };
    // @ts-ignore
    window.addEventListener('test', null, options);
    // @ts-ignore also - It seems like EventListenerOptions interface is not up to date
    window.removeEventListener('test', null, options);
  } catch (err) {
    result.supportsPassive = false;
  }

  /**
   * Test if once is supported
   */
  try {
    const options = {
      /**
       * This getter function will be called when the browser
       * attempts to access the once property.
       */
      get once() {
        result.supportsOnce = true;
        return false;
      },
    };
    // @ts-ignore
    window.addEventListener('test', null, options);
    // @ts-ignore also - It seems like EventListenerOptions interface is not up to date
    window.removeEventListener('test', null, options);
  } catch (err) {
    result.supportsOnce = false;
  }

  return result;
}

export default getEventListenerOptionsSupport;
