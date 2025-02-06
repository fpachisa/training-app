// src/components/WeeklyTaskView.js
import React from 'react';
import { getWeekDates, isWeekAccessible } from '../utils/dateUtils';

const WeeklyTaskView = ({ 
    tasks, 
    user, 
    handleFileSelect, 
    handleFileUpload, 
    previewImage, 
    uploading,
    handleTaskCompletion 
}) => {
    const weeks = getWeekDates();

    const getTasksForWeek = (weekNumber) => {
        return tasks.filter(task => task.week === weekNumber);
    };

    const formatDateRange = (startDate, endDate) => {
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    };

    return (
        <div className="space-y-8">
            {weeks.map((week) => {
                const weekTasks = getTasksForWeek(week.weekNumber);
                const isAccessible = isWeekAccessible(week.weekNumber);

                return (
                    <div key={week.weekNumber} className="bg-white rounded-lg shadow">
                        {/* Week Header */}
                        <div className="border-b border-gray-200 bg-gray-50 p-4 rounded-t-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Week {week.weekNumber}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {formatDateRange(week.startDate, week.endDate)}
                                </span>
                            </div>
                        </div>

                        {/* Week Content */}
                        <div className="p-4">
                            {!isAccessible ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400">
                                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">Week Locked</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            This week's tasks will be available from {week.startDate.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ) : weekTasks.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No tasks scheduled for this week</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {weekTasks.map(task => (
                                        <div
                                            key={task._id}
                                            className={`border rounded-lg p-4 ${
                                                task.status === 'completed' ? 'bg-green-50' : 'bg-white'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                                                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    task.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {task.status}
                                                </span>
                                            </div>

                                            {task.status === 'pending' && (
                                                <div className="mt-4">
                                                    {task.requiresScreenshot ? (
                                                        <>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileSelect(task._id, e.target.files[0])}
                                                                className="hidden"
                                                                id={`file-upload-${task._id}`}
                                                            />
                                                            <label
                                                                htmlFor={`file-upload-${task._id}`}
                                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                                            >
                                                                Upload Screenshot
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleTaskCompletion(task._id)}
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                                        >
                                                            Mark as Complete
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            {previewImage && previewImage.taskId === task._id && (
                                                <div className="mt-4">
                                                    <img
                                                        src={previewImage.url}
                                                        alt="Preview"
                                                        className="h-48 w-auto rounded-lg object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handleFileUpload(task._id, document.getElementById(`file-upload-${task._id}`).files[0])}
                                                        disabled={uploading}
                                                        className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    >
                                                        {uploading ? 'Uploading...' : 'Complete Task'}
                                                    </button>
                                                </div>
                                            )}

                                            {task.screenshot && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-gray-700 mb-2">Completion Screenshot:</p>
                                                    <img
                                                        src={task.screenshot}
                                                        alt="Task completion"
                                                        className="h-48 w-auto rounded-lg object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeeklyTaskView;