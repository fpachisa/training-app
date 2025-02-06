// server/predefinedTasks.js
const HALF_MARATHON_TASKS = {
    week1: [
        {
            title: "Week 1 - Easy Run",
            description: "5K at conversational pace. Focus on form.",
            points: 10,
            requiresScreenshot: true  // Requires proof of run
        },
        {
            title: "Week 1 - Cross Training",
            description: "30 minutes of low-impact exercise (swimming, cycling, or yoga)",
            points: 10,
            requiresScreenshot: false  // No screenshot needed for cross-training
        }
    ],
    week2: [
        {
            title: "Week 2 - Intervals",
            description: "6x400m intervals with 200m recovery jogs",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout completion
        },
        {
            title: "Week 2 - Long Run",
            description: "7K at steady pace",
            points: 15,
            requiresScreenshot: true  // Need to show distance covered
        }
    ],
    // Example for more weeks...
    week10: [
        {
            title: "Week 10 - Taper Run",
            description: "Easy 5K, focus on maintaining form",
            points: 10,
            requiresScreenshot: true
        },
        {
            title: "Week 10 - Race Preparation",
            description: "Light 3K jog, mental preparation and gear check",
            points: 10,
            requiresScreenshot: false  // No screenshot needed for preparation task
        }
    ]
};

const TEN_K_TASKS = {
    week1: [
        {
            title: "Week 1 - Base Run",
            description: "3K easy run at conversational pace",
            points: 10,
            requiresScreenshot: true  // Need to show completion of run
        },
        {
            title: "Week 1 - Strength",
            description: "Basic strength training routine for runners",
            points: 10,
            requiresScreenshot: false  // No screenshot needed for strength training
        }
    ],
    week2: [
        {
            title: "Week 2 - Speed Work",
            description: "4x200m intervals with walking recovery",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout
        },
        {
            title: "Week 2 - Distance Run",
            description: "4K at comfortable pace",
            points: 15,
            requiresScreenshot: true  // Need to show distance
        }
    ],

    week3: [
        {
            title: "Week 3 - Speed Work",
            description: "4x200m intervals with walking recovery",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout
        },
        {
            title: "Week 3 - Distance Run",
            description: "4K at comfortable pace",
            points: 15,
            requiresScreenshot: true  // Need to show distance
        }
    ],

    week4: [
        {
            title: "Week 4 - Speed Work",
            description: "4x200m intervals with walking recovery",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout
        },
        {
            title: "Week 4 - Distance Run",
            description: "4K at comfortable pace",
            points: 15,
            requiresScreenshot: false  // Need to show distance
        }
    ],    

    week5: [
        {
            title: "Week 5 - Speed Work",
            description: "4x200m intervals with walking recovery",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout
        },
        {
            title: "Week 5 - Distance Run",
            description: "4K at comfortable pace",
            points: 15,
            requiresScreenshot: true  // Need to show distance
        }
    ],
    
    week6: [
        {
            title: "Week 6 - Speed Work",
            description: "4x200m intervals with walking recovery",
            points: 15,
            requiresScreenshot: true  // Need to show interval workout
        },
        {
            title: "Week 6 - Distance Run",
            description: "4K at comfortable pace",
            points: 15,
            requiresScreenshot: true  // Need to show distance
        }
    ],   

    week10: [
        {
            title: "Week 10 - Easy Run",
            description: "Light 3K, focus on form and breathing",
            points: 10,
            requiresScreenshot: true
        },
        {
            title: "Week 10 - Pre-race",
            description: "2K jog, gear preparation and strategy review",
            points: 10,
            requiresScreenshot: false  // No screenshot needed for preparation
        }
    ]
};

module.exports = {
    HALF_MARATHON_TASKS,
    TEN_K_TASKS
};