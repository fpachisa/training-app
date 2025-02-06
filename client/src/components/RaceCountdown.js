// src/components/RaceCountdown.js
import React, { useState, useEffect } from 'react';

const RaceCountdown = ({ raceDate, trainingType }) => {
    const [daysToGo, setDaysToGo] = useState(0);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const calculateDaysToGo = () => {
            const now = new Date();
            const race = new Date('2025-04-27'); // Hardcoded race date
            const diffTime = race - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysToGo(diffDays);

            // Format the date
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            setFormattedDate(race.toLocaleDateString('en-US', options));
        };

        calculateDaysToGo();
        // Update countdown every day
        const timer = setInterval(calculateDaysToGo, 86400000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">Race Day Countdown</h2>
                    <p className="text-xl mb-1">{trainingType} Training</p>
                    <p className="text-sm opacity-90">
                        Race Date: {formattedDate}
                    </p>
                </div>
                
                <div className="flex items-center gap-6">
                    {/* Running man animation */}
                    <div className="hidden md:block">
                        <div className="w-20 h-20">
                            <svg 
                                className="animate-run" 
                                viewBox="0 0 24 24" 
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1 1.15 2.41 2.01 4 2.34V23H19V9h-1.5v1.78zM7.43 13.13l-2.12-.41c-.54-.11-.9-.63-.79-1.17l.76-3.93c.21-1.08 1.26-1.79 2.34-1.58l1.16.23-1.35 6.86z" />
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