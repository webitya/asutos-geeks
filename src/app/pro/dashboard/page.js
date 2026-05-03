'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated') {
      fetch('/api/pro/profile')
        .then(res => res.json())
        .then(d => {
          if (d.success && d.data) {
            setProfile(d.data);
          } else {
            // If no pro profile, send back to join
            router.push('/join');
          }
          setLoading(false);
        });
    }
  }, [status]);

  if (loading) return <div className="py-24 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Pro Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome back, {profile.name}. Manage your business growth here.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/join" className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
            Edit Profile
          </Link>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/20">
            Check Bookings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-blue-400" />
            <div className="relative flex flex-col items-center text-center mt-4">
              <img src={profile.image} alt="" className="w-24 h-24 rounded-2xl object-cover mb-4 border-4 border-white shadow-xl" />
              <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">{profile.skill}</p>
            </div>
            
            <div className="mt-8 space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs">📍</span>
                <span className="text-gray-500">{profile.city}, {profile.state}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs">💰</span>
                <span className="text-gray-500">₹ {profile.price}/hr</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs">⭐</span>
                <span className="text-gray-500">{profile.rating} Rating</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Bio</h4>
              <p className="text-sm text-gray-500 leading-relaxed italic">"{profile.bio}"</p>
            </div>
          </div>

          {profile.resume && (
            <a href={profile.resume} target="_blank" className="block bg-blue-50 border border-blue-100 p-6 rounded-3xl group">
              <h4 className="font-bold text-blue-900 mb-1 flex items-center justify-between">
                View Resume
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </h4>
              <p className="text-xs text-blue-800/60">Your professional portfolio is public.</p>
            </a>
          )}
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Profile Views</span>
                <span className="text-green-500 text-xs font-bold">+12%</span>
              </div>
              <h3 className="text-4xl font-black text-foreground">1,284</h3>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Jobs</span>
                <span className="text-blue-500 text-xs font-bold">New</span>
              </div>
              <h3 className="text-4xl font-black text-foreground">0</h3>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Earnings</span>
                <span className="text-gray-400 text-xs font-bold">N/A</span>
              </div>
              <h3 className="text-4xl font-black text-foreground">₹ 0</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden min-h-[400px] flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-xl">Recent Activity & Bookings</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold">Weekly</button>
                <button className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-bold">Monthly</button>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">No active bookings</h4>
              <p className="text-gray-500 text-sm max-w-xs">Your services are active and visible. New booking requests will appear here as soon as customers reach out.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
