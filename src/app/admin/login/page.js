'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem('adminToken')) {
      router.push('/admin/dashboard');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', 'true'); // Simple session flag
        router.push('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-soft border border-gray-100 p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">Wetawork</span>
            <span className="text-3xl font-bold text-accent">Geeks</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage your marketplace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Username</label>
            <input
              type="text"
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Password</label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Secure access only. Unauthorized attempts are logged.
        </p>
      </div>
    </div>
  );
}
