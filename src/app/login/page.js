'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentialsCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login-otp', {
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
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLogin = async (e) => {
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
        // Now use NextAuth to create session
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result.ok) {
          router.push('/');
        } else {
          setError(result.error);
        }
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
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-32 animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 -skew-x-12 -translate-x-32" />
      
      <div className="max-w-[380px] w-full glass rounded-[2rem] shadow-premium border border-purple-50 p-8 relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(109,40,217,0.15)]">
        <div className="text-center mb-6">
          <Link href="/" className="flex justify-center items-center gap-2 mb-4 group">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-lg font-medium">A</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-medium text-foreground tracking-tight leading-none">Asutos <span className="text-primary">Geeks</span></span>
            </div>
          </Link>
          <h1 className="text-xl font-light text-foreground mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-[11px] font-normal">Sign in to your workspace</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleCredentialsCheck} className="space-y-4">
            <div>
              <label className="block text-[9px] font-medium text-foreground uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
              <div className="relative flex items-center group">
                <svg className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  required
                  className="w-full bg-white border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-medium text-foreground uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div className="relative flex items-center group">
                <svg className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  required
                  className="w-full bg-white border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-xs font-normal text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-normal text-center bg-red-50 py-1.5 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-xl font-normal text-xs hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-1"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-[9px] uppercase tracking-widest"><span className="bg-white px-2.5 text-gray-400 rounded-full border border-gray-100 shadow-sm">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={() => signIn('google')}
              className="w-full bg-white border border-gray-100 py-2.5 rounded-xl font-normal text-xs flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-purple-100 hover:shadow-soft transition-all text-gray-600"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-3.5 h-3.5" alt="" />
              Sign in with Google
            </button>

            <p className="text-center text-[11px] text-gray-500 mt-5 font-normal">
              New here? <Link href="/register" className="text-primary hover:underline transition-all">Create an account</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyLogin} className="space-y-5">
            <p className="text-center text-gray-500 text-[11px] font-normal leading-relaxed">
              Verify your identity with the security code sent to <br/>
              <span className="font-medium text-foreground">{formData.email}</span>
            </p>
            
            <div className="relative">
              <input
                type="text"
                required
                maxLength={6}
                placeholder="000000"
                className="w-full text-center text-xl tracking-[1em] pl-[1em] bg-white border border-purple-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-inner font-medium text-primary placeholder:text-gray-200"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            
            {error && <p className="text-red-500 text-[10px] font-normal text-center bg-red-50 py-1.5 rounded-lg">{error}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2.5 rounded-xl font-normal text-xs hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-gray-400 text-[9px] uppercase tracking-widest font-normal hover:text-primary transition-colors pt-1"
            >
              Change email or password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
