'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignupPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log('Signup successful:', formData);
      router.push('/login');
    }
  };

  return (
    <div 
      className="bg-cover bg-center" 
      style={{ backgroundImage: "url('https://picsum.photos/id/43/1920/1080')" }}
    >
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 bg-black/50">
        <div className="w-full max-w-md p-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-bold text-center">Create Account</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">Start your creative journey today</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300 pl-1">Full Name</label>
              <div className="relative">
                <i className="fas fa-user absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                <input 
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} 
                  placeholder="Ansel Adams" required 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pr-4 pl-11 placeholder-gray-500 dark:placeholder-gray-400 transition focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-cyan-400/50"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1 pl-1 font-medium">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300 pl-1">Email</label>
              <div className="relative">
                <i className="fas fa-envelope absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                <input 
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange} 
                  placeholder="you@example.com" required 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pr-4 pl-11 placeholder-gray-500 dark:placeholder-gray-400 transition focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-cyan-400/50"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 pl-1 font-medium">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-gray-700 dark:text-gray-300 pl-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                <input 
                  type="password" id="password" name="password" value={formData.password} onChange={handleChange} 
                  placeholder="Minimum 8 characters" required 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pr-4 pl-11 placeholder-gray-500 dark:placeholder-gray-400 transition focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-cyan-400/50"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 pl-1 font-medium">{errors.password}</p>}
            </div>
            
            <button type="submit" className="btn btn-primary w-full mt-4 py-3 text-lg">
              Sign Up
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="font-semibold text-teal-600 dark:text-cyan-400 hover:border-b hover:border-teal-600 dark:hover:border-cyan-400 transition">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}