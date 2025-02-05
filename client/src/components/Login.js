// src/components/Login.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const backendResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/google`,
          {
            googleData: userInfo.data
          }
        );

        localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
        localStorage.setItem('token', backendResponse.data.token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    },
    onError: () => {
      console.log('Login Failed');
      alert('Login failed. Please try again.');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo/Icon */}
          <div className="mb-8 text-center">
            <div className="h-16 w-16 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Marathon Training</h2>
            <p className="text-sm text-gray-600 mt-2">Sign in to access your training dashboard</p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          {/* Sign in button */}
          <button
            onClick={() => login()}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-5 h-5" 
              alt="Google logo" 
            />
            Sign in with Google
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-8 text-center text-xs text-gray-600">
          © 2024 Marathon Training. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;