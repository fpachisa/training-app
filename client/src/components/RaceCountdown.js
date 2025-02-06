// src/components/RaceCountdown.js
import React, { useState, useEffect } from 'react';

const RaceCountdown = ({ raceDate, trainingType }) => {
    const [daysToGo, setDaysToGo] = useState(0);

    useEffect(() => {
        const calculateDaysToGo = () => {
            const now = new Date();
            const race = new Date(raceDate);
            const diffTime = race - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysToGo(diffDays);
        };

        calculateDaysToGo();
        // Update countdown every day
        const timer = setInterval(calculateDaysToGo, 86400000);
        return () => clearInterval(timer);
    }, [raceDate]);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">Race Day Countdown</h2>
                    <p className="text-xl mb-1">{trainingType} Training</p>
                    <p className="text-sm opacity-90">
                        Race Date: {new Date(raceDate).toLocaleDateString()}
                    </p>
                </div>
                
                <div className="flex items-center gap-6">
                    {/* Running man animation */}
                    <div className="hidden md:block">
                        <div className="w-16 h-16">
                            <svg className="animate-run" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 4C16.1046 4 17 3.10457 17 2C17 0.895431 16.1046 0 15 0C13.8954 0 13 0.895431 13 2C13 3.10457 13.8954 4 15 4Z" fill="currentColor"/>
                                <path d="M12.5 7L15 4L17.5 7L20 10H15L12.5 7Z" fill="currentColor"/>
                                <path d="M12 11.5L15 14L12 16.5L9 14L12 11.5Z" fill="currentColor"/>
                                <path d="M7 14L9.5 11L12 8.5L14.5 11L12 13.5L9.5 16L7 14Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>

                    {/* Countdown display */}
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-1">{daysToGo}</div>
                        <div className="text-sm uppercase tracking-wider">Days to Go!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceCountdown;