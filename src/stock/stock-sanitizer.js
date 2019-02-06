class StockSanitizer {
    static sanitize(dirtyValue) {
        let sanitizedValue;

        if (dirtyValue === null || dirtyValue === 'N/A')
            sanitizedValue = null;
        else if (dirtyValue.indexOf('%') !== -1)
            sanitizedValue = this.sanitizePercentage(dirtyValue);
        else if (dirtyValue.indexOf('B') !== -1)
            sanitizedValue = this.sanitizeBillions(dirtyValue);
        else if (dirtyValue.indexOf('M') !== -1)
            sanitizedValue = this.sanitizeMillions(dirtyValue);
        else {
            const parsedNumber = parseFloat(dirtyValue);

            if (isNaN(parsedNumber))
                sanitizedValue = dirtyValue;
            else
                sanitizedValue = parsedNumber;
        }

        return sanitizedValue;
    }

    static sanitizePercentage(dirtyValue) {
        let sanitizedValue = parseFloat(dirtyValue);
        return sanitizedValue;
    }

    static sanitizeBillions(dirtyValue) {
        let sanitizedValue = parseFloat(dirtyValue) * 1000000000;
        return sanitizedValue;
    }

    static sanitizeMillions(dirtyValue) {
        let sanitizedValue = parseFloat(dirtyValue) * 1000000;
        return sanitizedValue;
    }
}

module.exports = StockSanitizer;