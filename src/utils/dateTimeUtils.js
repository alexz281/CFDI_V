export const hour12DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
};

export const dateFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
};

export const dateStringToLocaleString = function(dateString, options = hour12DateTimeFormatOptions, locale) {
    return dateString !== undefined ? new Date(dateString).toLocaleString(locale, options) : undefined;
};