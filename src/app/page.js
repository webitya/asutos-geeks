'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      key: 'Finance & Accounting',
      icon: '$',
      color: 'bg-purple-50 text-primary',
      subcategories: ['Corporate Bookkeeping & Cloud Accounting', 'Finance Modeling & Valuation', 'Global Tax Strategy & Compliance', 'Fractional CFO & Advisory']
    },
    {
      key: 'Legal',
      icon: '⚖',
      color: 'bg-pink-50 text-accent',
      subcategories: ['Corporate & Contract Law', 'Intellectual Property (IP)', 'Legal Research & Paralegal Services', 'International Trade & Immigration']
    },
    {
      key: 'Video & Film',
      icon: '🎬',
      color: 'bg-indigo-50 text-indigo-600',
      subcategories: ['Video Editing & Post-Production', 'Animation & Motion Graphics', 'Streamer & Creator Support', 'AI Video & Generative Media']
    },
    {
      key: 'Graphics & Design',
      icon: '🎨',
      color: 'bg-violet-50 text-violet-700',
      subcategories: ['Brand Identity & Corporate Graphics', 'Architecture & Spatial Design', 'UI/UX & Web Design', 'Marketing & Promotional Design']
    }
  ];

  const mockPros = [
    { _id: '1', name: 'Sarah Jenkins', skill: 'Startup & Pitch Deck Financials', location: 'London, UK', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', rating: 4.9 },
    { _id: '2', name: 'David Miller', skill: 'Trademark Search & Filing', location: 'New York, US', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80', rating: 4.8 },
    { _id: '3', name: 'Elena Rostova', skill: '3D Product Animation', location: 'Berlin, DE', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', rating: 5.0 },
    { _id: '4', name: 'Marc Thorne', skill: 'Website & Landing Page Design', location: 'San Francisco, US', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', rating: 4.7 }
  ];

  const testimonials = [
    { name: "Sophia Carter", role: "CEO, Nexa Corp", text: "Having our 3-Statement financial model prepared by Wetawork was a game changer for our Series A funding. Absolute professionals." },
    { name: "Julian Alvarez", role: "Creator & Streamer", text: "The YouTuber rigging and custom overlays transformed my stream style. Fast delivery and exceptional creative talent!" },
    { name: "Hannah Goldstein", role: "Real Estate Director", text: "I hired an on-ground property surveyor here. Vetted profiles, secure payments, and outstanding communication throughout the process." }
  ];

  return (
    <div className="flex flex-col gap-20 pb-24 relative min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 px-4 sm:px-10 lg:px-16 overflow-hidden gradient-hero border-b border-purple-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-primary-light border border-purple-100 rounded-full px-4 py-1.5 w-fit mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-normal uppercase tracking-widest text-primary">Workspace Reinvented</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light text-foreground mb-5 leading-tight tracking-tight">
              Elite Freelance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-normal">Talent on Demand</span>.
            </h1>

            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-lg font-normal leading-relaxed">
              Find pre-vetted specialists in Corporate Finance, Intellectual Property Law, CGI Production & UX Engineering. Built for ambitious enterprises and creative studios.
            </p>

            {/* Search */}
            <div className="relative max-w-md w-full mb-10 z-30">
              <div className="bg-white border border-purple-100 shadow-premium p-1 rounded-2xl flex items-center gap-2">
                <div className="flex-grow flex items-center gap-2.5 px-4 py-3">
                  <svg className="w-4 h-4 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter skill (e.g. Patent Drafting)..."
                    className="w-full focus:outline-none text-xs font-normal text-foreground placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link
                  href={`/professionals?skill=${encodeURIComponent(searchQuery)}`}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-normal text-xs transition-all shadow-lg shadow-primary/20"
                >
                  Search
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex -space-x-2">
                {[12, 18, 23, 32].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="" className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                ))}
              </div>
              <p className="text-xs font-normal">Trusted by <span className="font-medium text-foreground">1,200+ global brands</span></p>
            </div>
          </div>

          {/* Right: Service Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-5">
            {categories.map((cat, i) => (
              <Link
                key={cat.key}
                href={`/professionals?category=${encodeURIComponent(cat.key)}`}
                className={`bg-white border border-gray-100 rounded-[2rem] p-6 shadow-soft hover:shadow-premium hover:border-purple-100 transition-all duration-300 flex flex-col ${i % 2 === 1 ? 'mt-6' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center text-lg mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">{cat.key}</h3>
                <p className="text-[11px] font-normal text-gray-400 leading-relaxed">{cat.subcategories[0]}, {cat.subcategories[1]} & more.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-light text-foreground mb-3">Explore our Workspaces</h2>
          <p className="text-gray-400 text-sm font-normal">Select an industry vertical to explore detailed sub-services and hiring solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.key} className="bg-white border border-gray-100 rounded-[2rem] p-7 hover:border-purple-100 hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center text-lg mb-5`}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-medium text-foreground mb-4">{cat.key}</h3>
                <ul className="space-y-2.5 mb-7">
                  {cat.subcategories.map((sub) => (
                    <li key={sub} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-200 flex-shrink-0" />
                      <Link
                        href={`/professionals?category=${encodeURIComponent(sub)}`}
                        className="text-[11px] font-normal text-gray-500 hover:text-primary transition-colors"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/professionals?category=${encodeURIComponent(cat.key)}`}
                className="w-full text-center py-3 rounded-xl bg-primary-light text-primary font-normal text-xs hover:bg-primary hover:text-white transition-all"
              >
                Explore Workspace
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-5 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-light text-foreground mb-2">Featured Industry Experts</h2>
            <p className="text-gray-400 text-sm font-normal">Fully verified specialists with top performance metrics.</p>
          </div>
          <Link href="/professionals" className="bg-primary/5 text-primary px-6 py-2.5 rounded-xl font-normal text-xs hover:bg-primary/10 transition-all">
            View All Experts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPros.map((pro) => (
            <div key={pro._id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-purple-100 transition-all duration-500 group flex flex-col hover:shadow-[0_20px_60px_-15px_rgba(109,40,217,0.12)]">
              <div className="relative h-52 w-full overflow-hidden">
                <img src={pro.image} alt={pro.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-normal text-primary flex items-center gap-1">
                  <span className="text-accent">★</span> {pro.rating.toFixed(1)}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-primary text-white text-[9px] font-normal uppercase tracking-wide px-2.5 py-1 rounded-md">
                    {pro.skill}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{pro.name}</h3>
                <p className="text-[11px] font-normal text-gray-400 mb-5">{pro.location}</p>
                <button className="mt-auto w-full py-3 rounded-xl bg-primary-light text-primary font-normal text-xs hover:bg-primary hover:text-white transition-all duration-300 border border-purple-100 hover:border-primary">
                  Book Expert Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Banner */}
      <section className="mx-4 sm:mx-10 lg:mx-16 bg-foreground text-white rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden max-w-7xl lg:mx-auto">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-32" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-normal uppercase tracking-widest text-primary mb-4 block">Enterprise Solutions</span>
            <h2 className="text-3xl md:text-4xl font-light mb-5 leading-tight">Elite Talent. Scaled for your Business.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md font-normal">
              Build your custom contingent workforce. We handle complete contract compliance, global B2B payments, and NDAs out-of-the-box.
            </p>
            <Link href="/pro/register" className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-normal text-xs transition-all shadow-xl shadow-primary/20">
              Hire for Business
            </Link>
          </div>
          <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team Workspace" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-light text-foreground mb-3">Client Case Studies</h2>
          <p className="text-gray-400 text-sm font-normal">See how leading companies integrate our specialized talents.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-soft flex flex-col justify-between hover:shadow-premium hover:border-purple-100 transition-all">
              <p className="text-gray-500 italic leading-relaxed text-sm font-normal mb-8">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center font-medium text-primary text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-xs">{t.name}</h4>
                  <p className="text-[10px] text-primary font-normal tracking-wide">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
