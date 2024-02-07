import { addDays } from 'date-fns';
// Add days to current day.
export const UseDate = () => {
    const addDaysToToday = (days) => {
        const today = new Date();
        const newDate = addDays(today, days);
        const milliseconds = newDate.getTime();
        console.log(milliseconds);

        return milliseconds; // must return this
    };

    return { addDaysToToday };
};
