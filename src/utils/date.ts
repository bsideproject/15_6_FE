export const dateToAmPmTimeFormat = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
};

export const getFirstDateOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDateOfMonth = (date: Date) => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(0);
    return nextMonth;
};

export const isSameDate = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

export const parsingDotDate = (date: Date | string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
};
