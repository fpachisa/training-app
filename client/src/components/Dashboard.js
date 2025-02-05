// src/components/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TrainingSelection from './TrainingSelection';
import AdminStats from './AdminStats';
import UserTaskFilter from './UserTaskFilter';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Keep the header visible during loading */}
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">Marathon Training</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* Loading spinner in the content area */}
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-sm text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  </div>
);

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


  const fetchTasks = useCallback(async (currentUser) => {
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
  }, [selectedUser]); // Add selectedUser as a dependency

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
  }, [fetchTasks]); // Add fetchTasks as a dependency


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

  if (loading) {
    return (
      <LoadingSpinner />
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

        {/* Admin Statistics and Filters */}
        {user.role === 'admin' && (
          <>
            <AdminStats users={users} tasks={tasks} />
            <UserTaskFilter 
              users={users}
              selectedUser={selectedUser}
              onUserChange={handleUserChange}
              taskStats={taskStats}
            />
          </>
        )}

        {/* Admin Task Creation Form */}
        {user.role === 'admin' && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h2>
            <form onSubmit={createTask} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow">
          <div className="grid gap-6 p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              tasks.map(task => (
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
                    </div>
                    {user.role === 'admin' && task.assignedTo && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        Assigned to: {task.assignedTo.name}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>

                    {user.role !== 'admin' && task.status === 'pending' && (
                      <div className="mt-4">
                        <div className="flex gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileSelect(task._id, e.target.files[0])}
                            className="hidden"
                            id={`file-upload-${task._id}`}
                          />
                          <label
                            htmlFor={`file-upload-${task._id}`}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                          >
                            Upload Screenshot
                          </label>

                          {previewImage && previewImage.taskId === task._id && (
                            <button
                              onClick={() => handleFileUpload(task._id, document.getElementById(`file-upload-${task._id}`).files[0])}
                              disabled={uploading}
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              {uploading ? 'Uploading...' : 'Complete Task'}
                            </button>
                          )}
                        </div>

                        {previewImage && previewImage.taskId === task._id && (
                          <div className="mt-4">
                            <img
                              src={previewImage.url}
                              alt="Preview"
                              className="h-48 w-auto rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;