export const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    return formattedDate;
};