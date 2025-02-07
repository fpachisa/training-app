// src/components/WeeklyProgress.js
import React from 'react';
import { getCurrentWeek } from '../utils/dateUtils';

const WeeklyProgress = ({ tasks }) => {
    const currentWeek = getCurrentWeek();

    // Calculate progress for a specific week based on points
    const calculateWeekProgress = (weekNumber) => {
        const weekTasks = tasks.filter(task => task.week === weekNumber);
        if (weekTasks.length === 0) return 0;

        const totalPoints = weekTasks.reduce((sum, task) => sum + task.points, 0);
        const earnedPoints = weekTasks
            .filter(task => task.status === 'completed')
            .reduce((sum, task) => sum + task.points, 0);

        return {
            percentage: Math.round((earnedPoints / totalPoints) * 100),
            earnedPoints,
            totalPoints,
            completedTasks: weekTasks.filter(task => task.status === 'completed').length,
            totalTasks: weekTasks.length
        };
    };

    // Calculate current week's progress
    const currentWeekProgress = calculateWeekProgress(currentWeek);

    // Get progress for previous weeks
    const previousWeeks = Array.from({ length: currentWeek - 1 }, (_, i) => i + 1)
        .map(weekNum => ({
            weekNumber: weekNum,
            ...calculateWeekProgress(weekNum)
        }));

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Current Week Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Week {currentWeek} Progress
                    </h3>
                    <div className="text-sm font-medium text-gray-600">
                        <span>{currentWeekProgress.earnedPoints} of {currentWeekProgress.totalPoints} points earned</span>
                        <span className="mx-2">|</span>
                        <span>{currentWeekProgress.completedTasks} of {currentWeekProgress.totalTasks} tasks completed</span>
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Points Progress
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                {currentWeekProgress.percentage}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                        <div
                            style={{ width: `${currentWeekProgress.percentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                        ></div>
                    </div>
                </div>
            </div>

            {/* Previous Weeks Summary */}
            {previousWeeks.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Previous Weeks</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {previousWeeks.map(week => (
                            <div 
                                key={week.weekNumber}
                                className={`p-3 rounded-lg ${
                                    week.percentage === 100 
                                        ? 'bg-green-100' 
                                        : week.percentage >= 50 
                                            ? 'bg-yellow-100' 
                                            : 'bg-red-100'
                                }`}
                            >
                                <div className="text-xs font-medium mb-1">Week {week.weekNumber}</div>
                                <div className="text-lg font-bold">
                                    {week.percentage}%
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                    {week.earnedPoints}/{week.totalPoints} pts
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeeklyProgress;