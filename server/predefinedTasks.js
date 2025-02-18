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
    week2: [
        {
            title: "Week 2 - Base Run",
            description: "6k run - break it down in:\n1k warmup pace\n4k - fast as you can, 15 seconds rest in between if HR goes too high\n1k cooldown pace",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2 - HIIT",
            description: "Stairs workout:\n7 rounds\n20 step taps - https://www.youtube.com/watch?v=TvppoqEGlD8\n10 step jumps - https://www.youtube.com/watch?v=Dovij49CKrs\n10 stair pushup and lunge - https://www.youtube.com/watch?v=K3U6ZcHNjSg",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2- Endurance",
            description: "8k at easier pace (think of being to pick up the phone and talk to someone \nNormally at any point during the run)",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2- Yoga",
            description: "30 mins full body yoga",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week3: [
        {
            title: "Week 3 - Base Run",
            description: "7k run - break it down in:\n1k warmup pace\n5k - fast as you can, 15 seconds rest in between if HR goes too high\n1k cooldown pace",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - HIIT",
            description: "5 rounds:\n10 burpees\n10 crunches\n10 jump squats",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - Sprints ",
            description: "Sprints-\n20 rounds of-\n100 meters sprint\n30 seconds rest",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - Swim/Cycle",
            description: "45 mins of swimming or cycling",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week4: [
        {
            title: "Week 4 - Base Run",
            description: "8k run - break it down in:\n16 rounds of-\n200m fastest pace as possible\n300m of 70% pace of above",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Squats",
            description: "300 bodyweight squats in whole day (doesn’t need to be in one go)\n10 squats * 30 sets",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Recovery",
            description: "12k walk",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Swim/Cycle",
            description: "45 mins of swimming or cycling",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week5: [
        {
            title: "Week 5 - Base Run",
            description: "10k run - break it down in:\n4 rounds of-\n2k run\n500m jog",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - HIIT",
            description: "8 sets of-\n10 lunges\n10 pushups / knee pushups\n30 jumping jacks",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Sprints ",
            description: "Sprints-\n20 rounds of-\n100 meters sprint\n30 seconds rest",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Yoga",
            description: "45 mins of Yoga",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ]
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
    week2: [
        {
            title: "Week 2 - Base Run",
            description: "4k run - break it down in:\n1k warmup pace\n2k - fast as you can, 15 seconds rest in between if HR goes too high\n1k cooldown pace",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2 - HIIT",
            description: "Stairs workout:\n5 rounds\n20 step taps - https://www.youtube.com/watch?v=TvppoqEGlD8\n10 step jumps - https://www.youtube.com/watch?v=Dovij49CKrs\n10 stair pushup and lunge - https://www.youtube.com/watch?v=K3U6ZcHNjSg",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2- Endurance",
            description: "6k at easier pace (think of being to pick up the phone and talk to someone \nNormally at any point during the run)",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 2- Yoga",
            description: "30 mins full body yoga",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week3: [
        {
            title: "Week 3 - Base Run",
            description: "5k run - break it down in:\n1k warmup pace\n3k - fast as you can, 15 seconds rest in between if HR goes too high\n1k cooldown pace",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - HIIT",
            description: "\n5 rounds:\n10 burpees\n10 crunches\n10 jump squats",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - Sprints ",
            description: "Sprints-\n20 rounds of-\n100 meters sprint\n30 seconds rest",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 3 - Swim/Cycle",
            description: "45 mins of swimming or cycling",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week4: [
        {
            title: "Week 4 - Base Run",
            description: "6k run - break it down in:\n12 rounds of-\n200m fastest pace as possible\n300m of 70% pace of above",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Squats",
            description: "200 bodyweight squats in whole day (doesn’t need to be in one go)\n10 squats * 20 sets",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Recovery",
            description: "10k walk",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 4 - Swim/Cycle",
            description: "45 mins of swimming or cycling",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ],
    week5: [
        {
            title: "Week 5 - Base Run",
            description: "6k run - break it down in:\n4 rounds of-\n1k run\n500m jog",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - HIIT",
            description: "5 sets of-\n10 lunges\n10 pushups / knee pushups\n30 jumping jacks",
            points: 20,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Sprints ",
            description: "Sprints-\n20 rounds of-\n100 meters sprint\n30 seconds rest",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        },
        {
            title: "Week 5 - Yoga",
            description: "45 mins of Yoga",
            points: 10,
            requiresScreenshot: true  // Requires proof of activity
        }
    ]
};

module.exports = {
    HALF_MARATHON_TASKS,
    TEN_K_TASKS
};