interface FormatNumberOptions {
    decimals?: number;
    compact?: boolean;
    comma?: boolean;
    trim?: boolean;
    sign?: boolean;
    locale?: string;
    currency?: string;
    currencyPosition?: 'before' | 'after';
    currencySpace?: boolean;
}

export const formatNumber = (
    value: number | string | null | undefined,
    options: FormatNumberOptions = {}
): string => {
    const {
        decimals = 2,
        compact = false,
        comma = true,
        trim = true,
        sign = false,
        locale = "en-IN",
        currency = "",
        currencyPosition = "before",
        currencySpace = false,
    } = options;

    if (value === null || value === undefined || value === "") return "0";

    const num = Number(value);
    if (isNaN(num)) return "0";

    const absNum = Math.abs(num);
    const prefix = num < 0 ? "-" : sign ? "+" : "";

    let symbol = currency;

    if (currency.length === 3 && /^[A-Z]{3}$/i.test(currency)) {
        try {
            const formatter = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency.toUpperCase(),
            });
            const parts = formatter.formatToParts(0);
            symbol = parts.find(p => p.type === 'currency')?.value || currency;
        } catch (e) {
            symbol = currency;
        }
    }

    let formatted = "";
    const clean = (n: string) => trim ? n.replace(/\.?0+$/, "") : n;

    if (compact) {
        if (absNum >= 1_000_000_000)
            formatted = `${clean((absNum / 1_000_000_000).toFixed(decimals))}B`;
        else if (absNum >= 1_000_000)
            formatted = `${clean((absNum / 1_000_000).toFixed(decimals))}M`;
        else if (absNum >= 1_000)
            formatted = `${clean((absNum / 1_000).toFixed(decimals))}K`;
        else
            formatted = clean(absNum.toFixed(decimals));
    } else {
        formatted = comma
            ? absNum.toLocaleString(locale, {
                minimumFractionDigits: trim ? 0 : decimals,
                maximumFractionDigits: decimals
            })
            : clean(absNum.toFixed(decimals));
    }

    const space = currencySpace ? " " : "";

    if (symbol) {
        return currencyPosition === "before"
            ? `${prefix}${symbol}${space}${formatted}`
            : `${prefix}${formatted}${space}${symbol}`;
    }

    return `${prefix}${formatted}`;
};
