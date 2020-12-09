import { detectEventListener } from '../src/detect-event-listener';

describe('Test detectEventListener()', () => {
  test('Return value', () => {
    const eventListenerSupport = detectEventListener();

    expect(typeof eventListenerSupport === 'object' && eventListenerSupport !== null).toBe(true);

    // Note: It's expected all of features are supported by jsdom
    expect(eventListenerSupport.supportsEventListener).toBe(true);
    expect(eventListenerSupport.supportsOptions).toBe(true);
    expect(eventListenerSupport.supportsOnce).toBe(true);
    expect(eventListenerSupport.supportsPassive).toBe(true);
  });
});
