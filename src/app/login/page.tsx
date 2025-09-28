'use client';

import React,{useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event("storage"));
      router.push('/profile');
    }
  };

  return (
    <div 
      className="bg-cover bg-center" 
      style={{ backgroundImage: "url('https://picsum.photos/id/29/1920/1080')" }}
    >
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 bg-black/50">
        <div className="w-full max-w-md p-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">Sign in to continue</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300 pl-1">Email</label>
              <div className="relative">
                <i className="fas fa-envelope absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pr-4 pl-11 placeholder-gray-500 dark:placeholder-gray-400 transition focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-cyan-400/50"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-gray-700 dark:text-gray-300 pl-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pr-4 pl-11 placeholder-gray-500 dark:placeholder-gray-400 transition focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-cyan-400/50"
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-full mt-4 py-3 text-lg">
              Sign In
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Don't have an account? <Link href="/signup" className="font-semibold text-teal-600 dark:text-cyan-400 hover:border-b hover:border-teal-600 dark:hover:border-cyan-400 transition">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}