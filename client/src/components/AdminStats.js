// src/components/AdminStats.js
import React from 'react';

const AdminStats = ({ users, tasks }) => {
    const calculateStats = () => {
        // Make sure we're only counting non-admin users
        const regularUsers = users.filter(user => user.role === 'user');
        
        // Log the users to verify the data
        console.log('Regular users:', regularUsers);
        
        const stats = {
            totalUsers: regularUsers.length,
            userTypeBreakdown: {
                '10K': regularUsers.filter(user => user.trainingType === '10K').length,
                'HALF_MARATHON': regularUsers.filter(user => user.trainingType === 'HALF_MARATHON').length
            },
            taskCompletion: {
                completed: tasks.filter(task => task.status === 'completed').length,
                pending: tasks.filter(task => task.status === 'pending').length
            }
        };

        // Log the breakdown to verify
        console.log('User type breakdown:', stats.userTypeBreakdown);

        stats.completionRate = tasks.length > 0 
            ? ((stats.taskCompletion.completed / tasks.length) * 100).toFixed(1) 
            : 0;

        return stats;
    };

    const stats = calculateStats();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Total Users Card */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-900">Total Users</p>
                            <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">10K Runners</span>
                        <span className="font-semibold text-indigo-600">{stats.userTypeBreakdown['10K']}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Half Marathon</span>
                        <span className="font-semibold text-indigo-600">{stats.userTypeBreakdown['HALF_MARATHON']}</span>
                    </div>
                </div>
            </div>

            {/* Tasks Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-900">Total Tasks</p>
                            <p className="text-3xl font-bold text-green-600">{tasks.length}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold text-green-600">{stats.taskCompletion.completed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-semibold text-yellow-600">{stats.taskCompletion.pending}</span>
                    </div>
                </div>
            </div>

            {/* Completion Rate Card */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-900">Completion Rate</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.completionRate}%</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 rounded-full h-2.5 transition-all duration-500"
                            style={{ width: `${stats.completionRate}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;