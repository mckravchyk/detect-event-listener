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
 */
export function detectEventListener(): EventListenerSupport {
  interface Options {
    readonly capture?: boolean
    readonly once?: boolean
    readonly passive?: boolean
  }

  // addEventListener supports using null as the listener callback but the type definitions do not
  // allow it.
  type AddListener = (eventName: string, callback: null, options: Options) => void
  type RemoveListener = AddListener;

  const result = {
    supportsEventListener: false,
    supportsOptions: false,
    supportsPassive: false,
    supportsOnce: false,
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    result.supportsEventListener = true;
  }
  else {
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
    (<AddListener><unknown>window.addEventListener)('test', null, options);
    (<RemoveListener><unknown>window.removeEventListener)('test', null, options);
  }
  catch (err) {
    //
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
    (<AddListener><unknown>window.addEventListener)('test', null, options);
    (<RemoveListener><unknown>window.removeEventListener)('test', null, options);
  }
  catch (err) {
    //
  }

  try {
    const options = {
      get once() {
        result.supportsOnce = true;
        return false;
      },
    };
    (<AddListener><unknown>window.addEventListener)('test', null, options);
    (<RemoveListener><unknown>window.removeEventListener)('test', null, options);
  }
  catch (err) {
    //
  }

  return result;
}
