// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { HALF_MARATHON_TASKS, TEN_K_TASKS } = require('./predefinedTasks');
const app = express();
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const isAdminEmail = (email) => {
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()) : [];
    return adminEmails.includes(email);
};


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Middleware
// At the top of your server.js
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models
const userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    trainingType: {
        type: String,
        enum: ['10K', 'HALF-MARATHON', null],
        default: null
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    
    raceDate: {
        type: Date,
        default: new Date('2025-04-27')
    }

});

// In server.js - Update Task schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    points: {
        type: Number,
        default: 10
    },
    requiresScreenshot: {
        type: Boolean,
        default: false
    },
    screenshot: String,
    week: Number,
    weekStartDate: Date,
    order: Number,
    trainingType: {
        type: String,
        enum: ['10K', 'HALF-MARATHON']
    }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// Email Configuration
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Routes
// 1. Google Auth callback
// In server.js - Update the Google auth endpoint
app.post('/api/auth/google', async (req, res) => {
    try {
        const { googleData } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email: googleData.email });
        
        if (!user) {
            // Create new user
            user = new User({
                email: googleData.email,
                name: googleData.name,
                googleId: googleData.sub,
                role: isAdminEmail(googleData.email) ? 'admin' : 'user',
                isFirstLogin: true,  // Set for new users
                trainingType: null   // Will be set when user selects training type
            });
            await user.save();
            console.log('Created new user:', user);
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        // Send complete user object
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                isFirstLogin: user.isFirstLogin || false,  // Include this field
                trainingType: user.trainingType || null     // Include this field
            },
            token
        });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        // Only fetch non-admin users with their training types
        const users = await User.find(
            { role: 'user' },
            'name email trainingType role' // Include these fields
        ).sort({ name: 1 });
        
        console.log('Fetched users:', users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2. Create Task (Admin only)
app.post('/api/tasks', async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
        const task = new Task({
            title,
            description,
            assignedTo
        });
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update task with screenshot endpoint
app.put('/api/tasks/:id', upload.single('screenshot'), async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Convert buffer to base64
        const fileBuffer = req.file.buffer;
        const fileType = req.file.mimetype;
        const base64String = `data:${fileType};base64,${fileBuffer.toString('base64')}`;

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(base64String, {
            resource_type: 'auto',
            folder: 'marathon-training'
        });

        // Update task in database
        const task = await Task.findByIdAndUpdate(
            id,
            {
                status: 'completed',
                screenshot: cloudinaryResponse.secure_url,
                completedAt: new Date()
            },
            { new: true }
        ).populate('assignedTo');

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Send email notification to admin
        const adminUser = await User.findOne({ role: 'admin' });
        if (adminUser && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: adminUser.email,
                subject: `Task Completed: ${task.title}`,
                html: `
                    <h2>Task Completed</h2>
                    <p><strong>Task:</strong> ${task.title}</p>
                    <p><strong>Completed by:</strong> ${task.assignedTo.name}</p>
                    <p><strong>Completed at:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Screenshot:</strong> <a href="${cloudinaryResponse.secure_url}">View Screenshot</a></p>
                `
            });
        }

        res.json(task);

    } catch (error) {
        console.error('Error in task update:', error);
        res.status(500).json({ error: error.message });
    }
});

// In server.js
app.post('/api/users/training-type', async (req, res) => {
    try {
        const { userId, trainingType } = req.body;
        
        // Check if user already has tasks
        const existingTasks = await Task.find({ assignedTo: userId });
        if (existingTasks.length > 0) {
            return res.status(400).json({ 
                error: 'Tasks already exist for this user',
                message: 'Training plan has already been generated for this user.'
            });
        }

        // Update user with training type and race date
        const user = await User.findByIdAndUpdate(
            userId,
            { 
                trainingType,
                isFirstLogin: false,
                raceDate: new Date('2025-04-27')
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the appropriate task set based on training type
        const taskSet = trainingType === 'HALF-MARATHON' 
            ? HALF_MARATHON_TASKS 
            : TEN_K_TASKS;

        // Create tasks for each week
        const programStartDate = new Date('2025-02-10');

        // Loop through each week
        for (let weekNum = 1; weekNum <= 10; weekNum++) {
            const weekTasks = taskSet[`week${weekNum}`];
            const weekStartDate = new Date(programStartDate);
            weekStartDate.setDate(weekStartDate.getDate() + (weekNum - 1) * 7);

            // Create each task for this week
            if (weekTasks) {
                await Promise.all(weekTasks.map(async (task, index) => {
                    await Task.create({
                        ...task,
                        assignedTo: userId,
                        week: weekNum,
                        weekStartDate: weekStartDate,
                        order: index + 1,
                        trainingType
                    });
                }));
            }
        }

        res.json({ user });
    } catch (error) {
        console.error('Error setting training type:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4. Get Tasks
// In server.js - Update the GET /api/tasks endpoint

app.get('/api/tasks', async (req, res) => {
    try {
        const { userId, role, filterUserId } = req.query;
        let query = {};

        // Determine which tasks to fetch
        if (role === 'admin') {
            if (filterUserId && filterUserId !== 'undefined' && filterUserId !== 'null') {
                query.assignedTo = filterUserId;
                console.log('Filtering tasks for user:', filterUserId);
            }
        } else {
            query.assignedTo = userId;
        }

        console.log('Task query:', query);

        const tasks = await Task.find(query)
            .populate('assignedTo', 'name email trainingType')
            .sort({ week: 1, order: 1, createdAt: 1 });

        console.log(`Found ${tasks.length} tasks for query:`, query);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add this endpoint to your server.js
app.put('/api/tasks/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: error.message });
    }
});

// In server.js - Add new endpoint for syncing tasks
app.options('/api/tasks/sync', cors());
app.post('/api/tasks/sync', cors(), async (req, res) => {
    try {
        // Get all users
        const users = await User.find({ role: 'user' });

        for (const user of users) {
            if (!user.trainingType) continue; // Skip users who haven't selected training type

            // Get task template based on user's training type
            const taskSet = user.trainingType === 'HALF-MARATHON' 
                ? HALF_MARATHON_TASKS 
                : TEN_K_TASKS;

            const programStartDate = new Date('2025-02-02');

            // Go through each week
            for (let weekNum = 1; weekNum <= 10; weekNum++) {
                const weekTasks = taskSet[`week${weekNum}`];
                const weekStartDate = new Date(programStartDate);
                weekStartDate.setDate(weekStartDate.getDate() + (weekNum - 1) * 7);

                if (weekTasks) {
                    // Get existing tasks for this user and week
                    const existingTasks = await Task.find({
                        assignedTo: user._id,
                        week: weekNum
                    });

                    // Create array of existing task titles for comparison
                    const existingTaskTitles = existingTasks.map(task => task.title);

                    // Add only new tasks that don't exist yet
                    for (const taskTemplate of weekTasks) {
                        if (!existingTaskTitles.includes(taskTemplate.title)) {
                            await Task.create({
                                ...taskTemplate,
                                assignedTo: user._id,
                                week: weekNum,
                                weekStartDate: weekStartDate,
                                trainingType: user.trainingType
                            });
                            console.log(`Added new task "${taskTemplate.title}" for user ${user.email}`);
                        }
                    }
                }
            }
        }

        res.json({ message: 'Tasks synchronized successfully' });
    } catch (error) {
        console.error('Error syncing tasks:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});