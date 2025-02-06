// src/components/RaceCountdown.js
import React, { useState, useEffect } from 'react';
import runningIcon from '../images/running-icon.gif';

const RaceCountdown = ({ raceDate, trainingType }) => {
    const [daysToGo, setDaysToGo] = useState(0);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const calculateDaysToGo = () => {
            const now = new Date();
            const race = new Date('2025-04-27');
            const diffTime = race - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysToGo(diffDays);

            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            setFormattedDate(race.toLocaleDateString('en-US', options));
        };

        calculateDaysToGo();
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
                    {/* Running Icon GIF */}
                    <div className="hidden md:block">
                        <img 
                            src={runningIcon} 
                            alt="Running" 
                            className="w-24 h-24 object-contain"
                        />
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