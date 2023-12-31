import { detectEventListener } from 'src';

describe('detect-event-listener', () => {
  it('returns feature support', () => {
    const eventListenerSupport = detectEventListener();

    expect(typeof eventListenerSupport === 'object' && eventListenerSupport !== null).toBe(true);

    // Note that it's expected all of features are supported by jsdom which is used in the test
    // suite.
    expect(eventListenerSupport.supportsEventListener).toBe(true);
    expect(eventListenerSupport.supportsOptions).toBe(true);
    expect(eventListenerSupport.supportsOnce).toBe(true);
    expect(eventListenerSupport.supportsPassive).toBe(true);
  });
});
