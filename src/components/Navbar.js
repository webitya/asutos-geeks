'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { CATEGORIES_DATA } from '@/lib/categories';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { data: session } = useSession();

  const handleDropdownOpen = (key) => setActiveDropdown(key);
  const handleDropdownClose = () => setActiveDropdown(null);

  const renderIcon = (type, className = "w-5 h-5") => {
    switch (type) {
      case "bank":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case "scale":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case "video":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case "palette":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Top Navbar */}
      <div className="max-w-full mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-base font-medium">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-foreground tracking-tight leading-none">Asutos <span className="text-primary">Geeks</span></span>
              <span className="text-[9px] font-normal text-gray-400 tracking-widest uppercase">Workspace</span>
            </div>
          </Link>

          {/* Quick Search */}
          <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 w-96 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search services, roles, skills..."
              className="bg-transparent border-none outline-none text-xs font-normal text-foreground placeholder:text-gray-400 w-full"
            />
          </div>

          {/* Main Links */}
          <div className="hidden md:flex items-center space-x-7">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors font-normal">Home</Link>
            <Link href="/professionals" className="text-sm text-gray-500 hover:text-primary transition-colors font-normal">Find Experts</Link>
            <Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors font-normal">About Us</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors font-normal">Contact</Link>

            <span className="w-px h-5 bg-gray-200"></span>

            {session ? (
              <div className="flex items-center gap-5">
                <Link href="/pro/dashboard" className="text-xs font-normal text-gray-500 hover:text-primary transition-colors">Dashboard</Link>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-primary-light px-3 py-1.5 rounded-full border border-purple-100">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-normal text-[10px] overflow-hidden">
                      {session.user.image ? <img src={session.user.image} alt="" className="w-full h-full object-cover" /> : session.user.name[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-normal text-primary">{session.user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={() => signOut()} className="text-gray-400 hover:text-accent text-xs transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-primary hover:text-primary-hover px-5 py-2 rounded-full transition-all font-normal text-xs border border-primary/20 hover:border-primary">
                  Sign In
                </Link>
                <Link href="/pro/register" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-hover transition-all shadow-md shadow-primary/20 font-normal text-xs">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 p-2 focus:outline-none hover:bg-gray-50 rounded-xl transition-all">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Sub-Navbar */}
      <div className="hidden md:block bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-full mx-auto px-4 sm:px-10 lg:px-16">
          <div className="flex space-x-10 h-11 items-center justify-start relative">
            {Object.entries(CATEGORIES_DATA).map(([key, value]) => {
              const isActive = activeDropdown === key;
              return (
                <div
                  key={key}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleDropdownOpen(key)}
                  onMouseLeave={handleDropdownClose}
                >
                  <button className={`h-full flex items-center gap-1.5 text-[11px] font-normal tracking-wide transition-all border-b-2 hover:text-primary ${
                    isActive ? 'border-primary text-primary' : 'border-transparent text-gray-500'
                  }`}>
                    {renderIcon(value.icon, "w-3.5 h-3.5")}
                    {value.label}
                    <svg className={`w-3 h-3 transition-transform ${isActive ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Mega Dropdown */}
                  {isActive && (
                    <div className="absolute left-0 top-11 w-full bg-white border border-gray-100 shadow-2xl rounded-b-[1.5rem] p-8 grid grid-cols-4 gap-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {Object.entries(value.subcategories).map(([subTitle, items]) => (
                        <div key={subTitle} className="flex flex-col">
                          <h4 className="text-[10px] font-medium text-primary uppercase tracking-wider border-b border-purple-50 pb-2 mb-3">
                            {subTitle}
                          </h4>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/professionals?skill=${encodeURIComponent(item)}`}
                                  className="text-[11px] font-normal text-gray-500 hover:text-accent transition-colors block leading-relaxed"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-5 px-6 space-y-5 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs font-normal text-foreground placeholder:text-gray-400 w-full" />
          </div>

          <div className="space-y-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-normal text-gray-600 hover:text-primary">Home</Link>
            <Link href="/professionals" onClick={() => setIsOpen(false)} className="block text-sm font-normal text-gray-600 hover:text-primary">Find Experts</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm font-normal text-gray-600 hover:text-primary">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-sm font-normal text-gray-600 hover:text-primary">Contact</Link>
          </div>

          <span className="block h-px bg-gray-100"></span>

          <div className="space-y-4">
            <p className="text-[10px] font-normal uppercase text-gray-400 tracking-widest">Our Categories</p>
            {Object.entries(CATEGORIES_DATA).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                  {renderIcon(value.icon, "w-3.5 h-3.5")}
                  {value.label}
                </div>
                <div className="pl-5 grid grid-cols-2 gap-1.5">
                  {Object.keys(value.subcategories).map((subTitle) => (
                    <Link
                      key={subTitle}
                      href={`/professionals?category=${encodeURIComponent(subTitle)}`}
                      onClick={() => setIsOpen(false)}
                      className="text-[10px] font-normal text-gray-500 hover:text-accent"
                    >
                      {subTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <span className="block h-px bg-gray-100"></span>

          {session ? (
            <div className="space-y-3">
              <Link href="/pro/dashboard" onClick={() => setIsOpen(false)} className="block text-sm font-normal text-gray-500 hover:text-primary">Dashboard</Link>
              <button onClick={() => { signOut(); setIsOpen(false); }} className="block w-full text-left text-sm font-normal text-red-400">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)} className="border border-primary/20 text-primary text-center px-5 py-2.5 rounded-2xl font-normal text-xs hover:bg-primary/5 transition-all">Sign In</Link>
              <Link href="/pro/register" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center px-5 py-2.5 rounded-2xl font-normal text-xs hover:bg-primary-hover transition-all">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
