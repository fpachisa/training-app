// server/predefinedTasks.js
const HALF_MARATHON_TASKS = {
    week1: [
        {
            title: "Week 1 - Base Run",
            description: "5k easy run at your regular pace.\nTry to not walk in between and stay at a consistent pace.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Strength Training",
            description: "\n5 rounds of:\n10 Jump squats\n10 half burpees\n10 crunches",
            points: 5,
            requiresScreenshot: false  // No screenshot needed
        },
        {
            title: "Week 1 - Sprints",
            description: "Sprints-\n25 rounds of-\n50 meters sprint\n30 seconds rest",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Yoga",
            description: "30 mins full body yoga",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Legs",
            description: "5 rounds of-\n20 bodyweight squats\n20 walking lunges\n20 standing calf raise",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week3: [
        {
            title: "Week 3 - Recovery Run",
            description: "Easy 2K run focusing on form.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week4: [
        {
            title: "Week 4 - Interval Training",
            description: "6x400m at race pace with 200m recovery jogs.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Cross Training",
            description: "45 minutes of cycling or swimming.",
            points: 10,
            requiresScreenshot: false  // No screenshot needed
        }
    ],
    week5: [
        {
            title: "Week 5 - Tempo Run",
            description: "4K run with middle 2K at race pace.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Easy Run",
            description: "3K recovery run.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week6: [
        {
            title: "Week 6 - Long Run",
            description: "6K at conversation pace.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 6 - Strength and Stretch",
            description: "Core workout and thorough stretching session.",
            points: 10,
            requiresScreenshot: false  // No screenshot needed
        }
    ],
    week7: [
        {
            title: "Week 7 - Speed Work",
            description: "8x200m sprints with full recovery.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 7 - Easy Run",
            description: "4K at comfortable pace.",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week8: [
        {
            title: "Week 8 - Race Simulation",
            description: "5K at target race pace.",
            points: 25,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 8 - Recovery Run",
            description: "Light 2K jog.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week9: [
        {
            title: "Week 9 - Final Long Run",
            description: "7K at steady pace.",
            points: 25,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 9 - Easy Run",
            description: "3K with form focus.",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week10: [
        {
            title: "Week 10 - Taper Run",
            description: "Light 3K run.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 10 - Race Prep",
            description: "Equipment check and race strategy review.",
            points: 5,
            requiresScreenshot: false  // No screenshot needed
        }
    ]};

const TEN_K_TASKS = {
    week1: [
        {
            title: "Week 1 - Base Run",
            description: "3K easy run at your regular pace.\nTry to not walk in between and stay at a consistent pace.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Strength Training",
            description: "\n3 rounds of:\n10 Jump squats\n10 half burpees\n10 crunches",
            points: 5,
            requiresScreenshot: false  // No screenshot needed
        },
        {
            title: "Week 1 - Sprints",
            description: "Sprints-\n20 rounds of-\n50 meters sprint\n30 seconds rest",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Yoga",
            description: "30 mins full body yoga",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 1 - Legs",
            description: "3 rounds of-\n20 bodyweight squats\n20 walking lunges\n20 standing calf raise",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week3: [
        {
            title: "Week 3 - Recovery Run",
            description: "Easy 2K run focusing on form.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week4: [
        {
            title: "Week 4 - Interval Training",
            description: "6x400m at race pace with 200m recovery jogs.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Cross Training",
            description: "45 minutes of cycling or swimming.",
            points: 10,
            requiresScreenshot: false  // No screenshot needed
        }
    ],
    week5: [
        {
            title: "Week 5 - Tempo Run",
            description: "4K run with middle 2K at race pace.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Easy Run",
            description: "3K recovery run.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week6: [
        {
            title: "Week 6 - Long Run",
            description: "6K at conversation pace.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 6 - Strength and Stretch",
            description: "Core workout and thorough stretching session.",
            points: 10,
            requiresScreenshot: false  // No screenshot needed
        }
    ],
    week7: [
        {
            title: "Week 7 - Speed Work",
            description: "8x200m sprints with full recovery.",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 7 - Easy Run",
            description: "4K at comfortable pace.",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week8: [
        {
            title: "Week 8 - Race Simulation",
            description: "5K at target race pace.",
            points: 25,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 8 - Recovery Run",
            description: "Light 2K jog.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week9: [
        {
            title: "Week 9 - Final Long Run",
            description: "7K at steady pace.",
            points: 25,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 9 - Easy Run",
            description: "3K with form focus.",
            points: 15,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week10: [
        {
            title: "Week 10 - Taper Run",
            description: "Light 3K run.",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 10 - Race Prep",
            description: "Equipment check and race strategy review.",
            points: 5,
            requiresScreenshot: false  // No screenshot needed
        }
    ]};

module.exports = {
    HALF_MARATHON_TASKS,
    TEN_K_TASKS
};