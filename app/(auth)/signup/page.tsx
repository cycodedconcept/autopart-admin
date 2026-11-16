'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  // Controlled single state object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return;
    
    setIsLoading(true);
    setTimeout(() => {
      console.log('Registering with controlled data:', formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="bg-orange-500 text-white p-3 rounded-2xl inline-flex items-center justify-center shadow-md">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
        <p className="text-sm text-gray-400 mt-1">Get started with your free account today</p>
      </div>

      {/* Core Controlled Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">👤</span>
            <input 
              type="text" 
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName} // Controlled value
              onChange={handleInputChange}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-700 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">✉</span>
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com"
              value={formData.email} // Controlled value
              onChange={handleInputChange}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-700 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">🔒</span>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password} // Controlled value
              onChange={handleInputChange}
              className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-700 font-medium"
              required
            />
          </div>
        </div>

        <div className="flex items-center text-xs font-medium pt-1">
          <label className="flex items-center text-gray-500 cursor-pointer select-none">
            <input 
              type="checkbox" 
              name="agreeTerms"
              checked={formData.agreeTerms} // Controlled checked attribute
              onChange={handleInputChange}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 mr-2" 
              required
            />
            I agree to the Terms & Conditions
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 rounded-xl shadow-md transition mt-4 text-sm flex items-center justify-center"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            'Register'
          )}
        </button>
      </form>

      <p className="text-xs text-center text-gray-500 font-medium mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-orange-500 hover:underline font-semibold">Sign in</Link>
      </p>
    </>
  );
}
