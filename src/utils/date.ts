export const dateToAmPmTimeFormat = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
};
