// src/components/UserTaskFilter.js
import React from 'react';

const UserTaskFilter = ({ users, selectedUser, onUserChange, taskStats }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0 flex-grow md:mr-4">
                    <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by User
                    </label>
                    <select
                        id="user-filter"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedUser || ''}
                        onChange={(e) => onUserChange(e.target.value)}
                    >
                        <option value="">All Users</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name} ({user.trainingType}) - {user.email}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedUser && taskStats && (
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Completed Tasks</p>
                            <p className="text-2xl font-bold text-green-600">
                                {taskStats.completed}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Pending Tasks</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {taskStats.pending}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {taskStats.completionRate}%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTaskFilter;