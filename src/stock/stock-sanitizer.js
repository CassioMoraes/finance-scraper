class StockSanitizer {
    static sanitize(dirtyValue) {
        let sanitizedValue;

        if (dirtyValue.indexOf('%') !== -1)
            sanitizedValue = this.sanitizePercentage(dirtyValue);
        else if (dirtyValue.indexOf('B') !== -1)
            sanitizedValue = this.sanitizeBillions(dirtyValue);
        else if (dirtyValue.indexOf('M') !== -1)
            sanitizedValue = this.sanitizeMillions(dirtyValue);
        else if (dirtyValue === 'N/A')
            sanitizedValue = null;
        else
            sanitizedValue = dirtyValue;

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