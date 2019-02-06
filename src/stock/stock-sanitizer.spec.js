const StockSanitizer = require('./stock-sanitizer');

describe('#sanitize()', () => {
    test('when text value is passed should return same value', async () => {
        const sanitizedValue = StockSanitizer.sanitize('foo')
        expect(sanitizedValue).toBe('foo');
    });

    test('should return number withou %', async () => {
        const sanitizedValue = StockSanitizer.sanitize('50.05%')
        expect(sanitizedValue).toBe(50.05);
    });

    test('when N/A is passed should return null', async () => {
        const sanitizedValue = StockSanitizer.sanitize('N/A')
        expect(sanitizedValue).toBeNull();
    });

    test('when there is the B suffix after the number should return number times 1.000.000.000', async () => {
        const sanitizedValue = StockSanitizer.sanitize('4.31B')
        expect(sanitizedValue).toBe(4310000000);
    });

    test('when there is the M suffix after the number should return number times 1.000.000', async () => {
        const sanitizedValue = StockSanitizer.sanitize('4.31M')
        expect(sanitizedValue).toBe(4310000);
    });
});