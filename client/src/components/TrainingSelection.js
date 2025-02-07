// src/components/TrainingSelection.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainingSelection = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const handleSelection = async (trainingType) => {
        try {
            setIsLoading(true);
            setError('');
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/training-type`, {
                userId: storedUser._id,
                trainingType
            });
            
            // Update local storage with new user data
            const updatedUser = {
                ...storedUser,
                trainingType: trainingType,
                isFirstLogin: false
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Navigate to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error setting training type:', error);
            setError(error.response?.data?.message || 'Failed to set training type. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Welcome to Your Training Journey
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Select your training goal
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={() => handleSelection('10K')}
                            disabled={isLoading}
                            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Setting up 10K Training...' : '10K Training'}
                        </button>

                        <button
                            onClick={() => handleSelection('HALF-MARATHON')}
                            disabled={isLoading}
                            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Setting up Half Marathon Training...' : 'Half Marathon Training'}
                        </button>
                    </div>

                    {isLoading && (
                        <div className="mt-4">
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                            <p className="text-center text-sm text-gray-600 mt-2">
                                Generating your training plan...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainingSelection;