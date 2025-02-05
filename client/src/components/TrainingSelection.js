// src/components/TrainingSelection.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainingSelection = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const handleSelection = async (trainingType) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/training-type`, {
                userId: storedUser._id,
                trainingType
            });
            
            // Update local storage with new user data including training type
            const updatedUser = {
                ...storedUser,
                trainingType: trainingType,
                isFirstLogin: false
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Force reload to update the dashboard
            window.location.reload();
        } catch (error) {
            console.error('Error setting training type:', error);
            alert('Failed to set training type. Please try again.');
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

                    <div className="space-y-4">
                        <button
                            onClick={() => handleSelection('10K')}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            10K Training
                        </button>

                        <button
                            onClick={() => handleSelection('HALF_MARATHON')}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                            Half Marathon Training
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingSelection;