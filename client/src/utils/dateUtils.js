// src/utils/dateUtils.js
export const PROGRAM_START_DATE = new Date('2025-01-01');
export const PROGRAM_END_DATE = new Date('2025-04-27');

export const getWeekDates = () => {
    const weeks = [];
    let currentDate = new Date(PROGRAM_START_DATE);

    for (let weekNum = 1; weekNum <= 10; weekNum++) {
        const weekEndDate = new Date(currentDate);
        weekEndDate.setDate(weekEndDate.getDate() + 6);

        weeks.push({
            weekNumber: weekNum,
            startDate: new Date(currentDate),
            endDate: new Date(weekEndDate)
        });

        // Move to next week
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return weeks;
};

export const getCurrentWeek = () => {
    const today = new Date();
    const weeks = getWeekDates();
    
    return weeks.find(week => 
        today >= week.startDate && today <= week.endDate
    )?.weekNumber || 0;
};

export const isWeekAccessible = (weekNumber) => {
    const today = new Date();
    const weeks = getWeekDates();
    const weekData = weeks[weekNumber - 1];
    
    return today >= weekData.startDate;
};