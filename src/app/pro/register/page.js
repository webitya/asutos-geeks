'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function ProRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', skill: '', 
    location: '', state: '', city: '', country: '', 
    password: '', confirmPassword: '', resume: ''
  });
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    setError('');

    try {
      // For this demo, we'll use the existing register API but we'll need to update it to handle pro fields
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'pro' }),
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
        // Success! Now they can login.
        router.push('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const proImages = [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Images Grid */}
      <div className="hidden lg:grid lg:w-[45%] grid-cols-2 gap-2 p-4 bg-gray-50 h-screen sticky top-0 overflow-hidden">
        {proImages.map((src, i) => (
          <div key={i} className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? 'translate-y-6' : ''}`}>
            <img src={src} alt="Professional" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/5 hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent flex items-end p-12">
          <div className="max-w-sm">
            <h2 className="text-3xl font-black text-foreground mb-3 leading-tight">Join <span className="text-primary">Verified Experts</span>.</h2>
            <p className="text-sm text-gray-500 font-bold">Wetawork empowers professionals with growth tools.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-[55%] p-6 lg:p-12 bg-white min-h-screen">


        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">Wetawork</span>
              <span className="text-2xl font-bold text-accent">Geeks</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-1">Register as Professional</h1>
            <p className="text-sm text-gray-500">Fill in your details to start your professional journey.</p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-3">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                  <input type="email" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                  <input type="tel" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 00000 00000" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Primary Skill</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all" value={formData.skill} onChange={(e) => setFormData({...formData, skill: e.target.value})} placeholder="Electrician, Developer, etc." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Detailed Address</label>
                <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="House No, Street, Landmark" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">City</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-accent" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">State</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-accent" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Country</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-accent" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Zip</label>
                  <input type="text" required className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-accent" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Resume Link</label>
                <input type="text" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" value={formData.resume} onChange={(e) => setFormData({...formData, resume: e.target.value})} placeholder="https://drive.google.com/..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Password</label>
                  <input type="password" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Confirm</label>
                  <input type="password" required className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
              </div>

              {error && <p className="text-red-500 text-[10px] font-bold bg-red-50 py-1.5 px-3 rounded-lg">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                {loading ? 'Sending...' : 'Verify & Register'}
              </button>

              <div className="relative py-1 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                <span className="relative bg-white px-2 text-[8px] font-black text-gray-400 uppercase tracking-widest">Or</span>
              </div>

              <button type="button" onClick={() => signIn('google')} className="w-full border border-gray-300 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="" />
                Sign in with Google
              </button>
            </form>


          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8 py-12">
              <div className="text-center">
                <p className="text-gray-600 mb-2">We've sent a code to</p>
                <p className="font-bold text-foreground text-lg mb-8">{formData.email}</p>
              </div>
              <input type="text" maxLength={6} required className="w-full text-center text-4xl font-black tracking-[1.5rem] bg-gray-50 border border-gray-100 rounded-3xl px-5 py-8 focus:outline-none focus:ring-2 focus:ring-primary/20" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" />
              <button type="submit" disabled={loading} className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-accent/20">
                {loading ? 'Verifying...' : 'Verify & Complete'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-gray-400 text-sm font-bold hover:text-foreground">Change Email</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
