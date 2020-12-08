import getEventListenerOptionsSupport from '../dist/esm/getEventListenerOptionsSupport';

describe('Test getEventListenerOptionsSupport()', () => {
  test('Return type', () => {
    const optionsSupport = getEventListenerOptionsSupport();

    expect(typeof optionsSupport === 'object' && optionsSupport !== null).toBe(true);

    // Note: It seems like jsdom supports all these options, so we are expecting true
    expect(optionsSupport.supportsOptions).toBe(true);
    expect(optionsSupport.supportsOnce).toBe(true);
    expect(optionsSupport.supportsPassive).toBe(true);
  });
});
