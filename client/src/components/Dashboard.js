// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainingSelection from './TrainingSelection';
import AdminStats from './AdminStats';
import UserTaskFilter from './UserTaskFilter';
import RaceCountdown from './RaceCountdown';
import WeeklyTaskView from './WeeklyTaskView';
import ProgressBanner from './ProgressBanner';
import WeeklyProgress from './WeeklyProgress';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [taskStats, setTaskStats] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user data:', storedUser);
    if (storedUser) {
      setUser(storedUser);
      fetchTasks(storedUser);
      if (storedUser.role === 'admin') {
        fetchUsers();
      }
    }
    setLoading(false);
  }, []);

  const fetchTasks = async (currentUser) => {
    try {
      const queryParams = { 
        userId: currentUser._id, 
        role: currentUser.role
      };

      if (currentUser.role === 'admin' && selectedUser) {
        queryParams.filterUserId = selectedUser;
      }

      console.log('Fetching tasks with params:', queryParams);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        params: queryParams
      });
      console.log('Received tasks:', response.data);
      setTasks(response.data);

      if (selectedUser) {
        const userTasks = response.data;
        const completed = userTasks.filter(task => task.status === 'completed').length;
        const total = userTasks.length;
        setTaskStats({
          completed,
          pending: total - completed,
          completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserChange = async (userId) => {
    console.log('Selected user:', userId);
    setSelectedUser(userId);
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        params: {
          filterUserId: userId,
          role: 'admin'
        }
      });
      setTasks(response.data);

      const userTasks = response.data;
      const completed = userTasks.filter(task => task.status === 'completed').length;
      const total = userTasks.length;
      setTaskStats({
        completed,
        pending: total - completed,
        completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
      });
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask);
      setNewTask({ title: '', description: '', assignedTo: '' });
      fetchTasks(user);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleFileSelect = (taskId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage({ taskId, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (taskId, file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('screenshot', file);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setPreviewImage(null);
      fetchTasks(user);
      alert('Task completed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload screenshot. Please try again.');
    } finally {
      setUploading(false);
    }
  };

 // Add this function to your Dashboard component
const handleTaskCompletion = async (taskId) => {
  try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/complete`);
      fetchTasks(user);
      alert('Task completed successfully!');
  } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task. Please try again.');
  }
}; 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">No user data found</h2>
          <p className="mt-2 text-gray-600">Please try logging in again</p>
        </div>
      </div>
    );
  }

  if (user.role === 'user' && user.isFirstLogin) {
    return <TrainingSelection />;
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {user.role === 'admin' ? 'Admin Dashboard' : `${user.trainingType} Training Dashboard`}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {user.role === 'admin' 
              ? 'Manage training tasks and user progress' 
              : `Track your progress in ${user.trainingType} training`}
          </p>
        </div>

        {/* User Specific Components */}
        {user.role !== 'admin' && (
          <>
          <RaceCountdown raceDate={user.raceDate} trainingType={user.trainingType} />
          <WeeklyProgress tasks={tasks} />
          <WeeklyTaskView
              tasks={tasks}
              user={user}
              handleFileSelect={handleFileSelect}
              handleFileUpload={handleFileUpload}
              previewImage={previewImage}
              uploading={uploading}
              handleTaskCompletion={handleTaskCompletion}
          />
          </>
        )}

        {/* Admin Specific Components */}
        {user.role === 'admin' && (
          <>
            <AdminStats users={users} tasks={tasks} />
            <UserTaskFilter 
              users={users}
              selectedUser={selectedUser}
              onUserChange={handleUserChange}
              taskStats={taskStats}
            />

            {/* Admin Task List */}

          <div className="bg-white rounded-lg shadow">
              {/* Group and sort tasks by week */}
              {Array.from({ length: 10 }, (_, i) => i + 1).map(weekNum => {
                  const weekTasks = tasks.filter(task => task.week === weekNum);
                  if (weekTasks.length === 0) return null;

                  return (
                      <div key={weekNum} className="border-b last:border-b-0">
                          <div className="bg-gray-50 px-6 py-3">
                              <h3 className="text-lg font-medium text-gray-900">Week {weekNum}</h3>
                          </div>
                          <div className="p-6 space-y-6">
                              {weekTasks.map(task => (
                                  <div
                                      key={task._id}
                                      className={`border rounded-lg p-6 ${
                                          task.status === 'completed' ? 'bg-green-50' : 'bg-white'
                                      }`}
                                  >
                                      <div className="flex justify-between items-start">
                                          <div>
                                              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                                              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                                              <div className="mt-2 flex items-center gap-4">
                                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                      task.status === 'completed' 
                                                          ? 'bg-green-100 text-green-800' 
                                                          : 'bg-yellow-100 text-yellow-800'
                                                  }`}>
                                                      {task.status}
                                                  </span>
                                                  <span className="text-sm text-gray-500">
                                                      {task.points} points
                                                  </span>
                                                  {task.requiresScreenshot && (
                                                      <span className="text-sm text-gray-500">
                                                          Screenshot required
                                                      </span>
                                                  )}
                                              </div>
                                          </div>
                                          {task.assignedTo && (
                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                                  {task.assignedTo.name}
                                              </span>
                                          )}
                                      </div>

                                      {task.screenshot && (
                                          <div className="mt-4">
                                              <p className="text-sm font-medium text-gray-700 mb-2">Completion Screenshot:</p>
                                              <img
                                                  src={task.screenshot}
                                                  alt="Task completion"
                                                  className="h-48 w-auto rounded-lg object-cover"
                                              />
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  );
              })}
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;