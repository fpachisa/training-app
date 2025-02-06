// src/components/ProgressBanner.js
import React from 'react';

const ProgressBanner = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
    const earnedPoints = tasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + task.points, 0);
    
    const progressPercentage = (earnedPoints / totalPoints) * 100;
    
    // Get appropriate message based on progress
    const getMessage = () => {
        if (progressPercentage === 0) return "Start your training journey!";
        if (progressPercentage < 25) return "Great start! Keep going!";
        if (progressPercentage < 50) return "You're making progress! Stay motivated!";
        if (progressPercentage < 75) return "You're doing amazing! Keep pushing!";
        if (progressPercentage < 100) return "Almost there! Finish strong!";
        return "Congratulations! You've completed all tasks!";
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
                    <p className="text-sm text-gray-600">{getMessage()}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-600">
                        {earnedPoints}/{totalPoints}
                    </span>
                    <p className="text-sm text-gray-600">Points Earned</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                            Progress
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                    <div
                        style={{ width: `${progressPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                    ></div>
                </div>
            </div>

            {/* Task completion status */}
            <div className="mt-4 flex justify-between text-sm text-gray-600">
                <span>{completedTasks} of {totalTasks} tasks completed</span>
                <span className="text-indigo-600 font-semibold">
                    {totalTasks - completedTasks} tasks remaining
                </span>
            </div>
        </div>
    );
};

export default ProgressBanner;