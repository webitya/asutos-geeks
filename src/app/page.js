'use client';
import Link from 'next/link';
import ProfessionalCard from '@/components/ProfessionalCard';
import Card from '@/components/Card';

export default function Home() {
  const categories = [
    { title: 'Electrician', icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), color: 'bg-blue-500' },
    { title: 'Painter', icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ), color: 'bg-orange-500' },
    { title: 'Developer', icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), color: 'bg-indigo-500' },
    { title: 'Tailoring', icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
      </svg>
    ), color: 'bg-pink-500' },
    { title: 'Home Services', icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ), color: 'bg-green-500' },
  ];

  const testimonials = [
    { name: "Rahul Sharma", role: "Homeowner", text: "Found an amazing electrician within minutes. The service was professional and affordable." },
    { name: "Priya Singh", role: "Entrepreneur", text: "Asutos Geeks helped me find a skilled developer for my startup. Highly recommended!" },
    { name: "Anita Devi", role: "Boutique Owner", text: "The tailoring services here are exceptional. It's great to see a platform empowering local workers." }
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="h-[90vh] bg-white px-4 sm:px-10 lg:px-16 flex items-center border-b border-gray-50 overflow-hidden relative">
        <div className="w-full flex flex-col lg:flex-row items-center gap-16 py-12">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Book Trusted Services at <br />
              <span className="text-primary">Your Doorstep</span>.
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-lg font-medium">
              Electricians, Tailors, Developers & More. Get professional help from the most skilled experts in your local area.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/professionals" className="bg-accent text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-accent/20">
                Explore Services
              </Link>
              <Link href="/pro/register" className="bg-white border-2 border-primary text-primary px-8 py-3.5 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
                Become a Pro
              </Link>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex -space-x-2">
                {[12,14,23,32].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                ))}
              </div>
              <p className="text-sm font-medium">Trusted by <span className="font-bold text-foreground">10k+ customers</span></p>
            </div>
          </div>

          {/* Right Side: Image Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 h-[70vh]">
            <div className="h-full rounded-3xl overflow-hidden shadow-2xl relative group">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" alt="Electrician" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-6 left-6 text-white font-bold">Verified Experts</span>
            </div>
            <div className="flex flex-col gap-4 h-full">
              <div className="h-1/2 rounded-3xl overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=400" alt="Tailor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="h-1/2 rounded-3xl overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400" alt="Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Quick Search */}
      <section className="px-4 sm:px-10 lg:px-16 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-2">
          <div className="flex-grow flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-100 w-full md:w-auto">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="What service do you need?" className="w-full focus:outline-none text-sm font-bold text-foreground placeholder:text-gray-400" />
          </div>
          <div className="flex-grow flex items-center gap-3 px-6 py-4 w-full md:w-auto">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <input type="text" placeholder="Enter City/Location" className="w-full focus:outline-none text-sm font-bold text-foreground placeholder:text-gray-400" />
          </div>
          <button className="bg-primary text-white px-10 py-4 rounded-3xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 w-full md:w-auto">
            Find Professionals
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-foreground mb-2">Explore Categories</h2>
            <p className="text-gray-500 text-sm">Find the right expert for your specific needs across various industries.</p>
          </div>
          <Link href="/professionals" className="text-primary font-bold text-sm hover:underline">View all categories →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <Link key={i} href={`/professionals?category=${cat.title}`} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-2xl">
                {cat.icon}
              </div>
              <h3 className="font-bold text-sm text-foreground">{cat.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="px-4 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-foreground mb-2">Top Rated Professionals</h2>
            <p className="text-gray-500 text-sm">Our most trusted and highly-rated experts ready to assist you.</p>
          </div>
          <Link href="/professionals" className="bg-primary/5 text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/10 transition-all">View All Experts</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { _id: '1', name: 'Arjun Sharma', skill: 'Electrician', location: 'Delhi, IN', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', rating: 4.9 },
            { _id: '2', name: 'Priya Patel', skill: 'Tailoring', location: 'Mumbai, IN', image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400', rating: 4.8 },
            { _id: '3', name: 'Rahul Verma', skill: 'Painter', location: 'Bangalore, IN', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', rating: 4.7 },
            { _id: '4', name: 'Sonia Khan', skill: 'Developer', location: 'Hyderabad, IN', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400', rating: 5.0 },
          ].map((pro) => (
            <div key={pro._id} className="scale-95 hover:scale-100 transition-transform duration-500">
              <ProfessionalCard professional={pro} />
            </div>
          ))}
        </div>
      </section>

      {/* Women Empowerment Section */}
      <section className="bg-foreground py-16 text-white overflow-hidden relative mx-4 sm:mx-10 lg:mx-16 rounded-[2.5rem]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-32" />
        <div className="max-w-full mx-auto px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Empowering Women through Skill & Opportunity</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We believe in the power of home-based growth. Asutos Geeks provides a platform for women to showcase their skills in tailoring, cooking, and handicrafts.
              </p>
              <Link href="/pro/register" className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
                Join the Movement
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gray-800 rounded-3xl aspect-square overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Women Empowerment" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Voices of Trust</h2>
          <p className="text-gray-500">See why thousands of customers love Asutos Geeks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 italic leading-relaxed text-sm">"{t.text}"</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
