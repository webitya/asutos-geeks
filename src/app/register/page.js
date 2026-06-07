'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        // Automatically log in after verification
        signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/',
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-accent/5 -skew-x-12 -translate-x-32 animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 skew-x-12 translate-x-32" />
      
      <div className="max-w-md w-full glass rounded-[2.5rem] shadow-premium border border-purple-50 p-10 relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(109,40,217,0.15)]">
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl font-medium">A</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-medium text-foreground tracking-tight leading-none">Asutos <span className="text-primary">Geeks</span></span>
            </div>
          </Link>
          <h1 className="text-2xl font-light text-foreground mb-2">Create Account</h1>
          <p className="text-gray-400 text-xs font-normal">Join the elite marketplace today</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative flex items-center group">
              <svg className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-5 py-3 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="relative flex items-center group">
              <svg className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-5 py-3 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative flex items-center group">
              <svg className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-5 py-3 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="relative flex items-center group">
              <svg className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-5 py-3 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="relative flex items-center group">
              <svg className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-5 py-3 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-normal text-center bg-red-50 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-normal text-xs hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-2"
            >
              {loading ? 'Sending OTP...' : 'Register'}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-white px-3 text-gray-400 rounded-full border border-gray-100 shadow-sm">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={() => signIn('google')}
              className="w-full bg-white border border-gray-100 py-3.5 rounded-xl font-normal text-xs flex items-center justify-center gap-2.5 hover:bg-gray-50 hover:border-purple-100 hover:shadow-soft transition-all text-gray-600"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="" />
              Sign up with Google
            </button>

            <p className="text-center text-xs text-gray-500 mt-6 font-normal">
              Already have an account? <Link href="/login" className="text-primary hover:underline transition-all">Sign In</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <p className="text-center text-gray-500 text-xs font-normal leading-relaxed">
              We've sent a 6-digit security code to <br/>
              <span className="font-medium text-foreground">{formData.email}</span>
            </p>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={6}
                placeholder="000000"
                className="w-full text-center text-2xl tracking-[1.5em] pl-[1.5em] bg-white border border-purple-100 rounded-2xl px-5 py-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-inner font-medium text-primary placeholder:text-gray-200"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-normal text-center bg-red-50 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-normal text-xs hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-gray-400 text-[10px] uppercase tracking-widest font-normal hover:text-primary transition-colors pt-2"
            >
              Back to registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
