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
};

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
};

module.exports = {
    HALF_MARATHON_TASKS,
    TEN_K_TASKS
};