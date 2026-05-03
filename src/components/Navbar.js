'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex justify-between h-20 items-center">

          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Asutos</span>
              <span className="text-2xl font-bold text-accent">Geeks</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/professionals" className="text-foreground hover:text-primary transition-colors font-medium">Professionals</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</Link>
            
            {session ? (
              <div className="flex items-center gap-6">
                <Link href="/pro/dashboard" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Dashboard</Link>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-accent bg-white text-accent flex items-center justify-center font-black text-xs overflow-hidden shadow-sm">
                      {session.user.image ? <img src={session.user.image} alt="" className="w-full h-full object-cover" /> : session.user.name[0].toUpperCase()}
                    </div>


                    <span className="text-sm font-bold text-foreground">{session.user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={() => signOut()} className="text-gray-400 hover:text-red-500 font-bold text-sm transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="border-2 border-primary text-primary px-6 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all font-bold text-sm">
                  Sign In
                </Link>
                <Link href="/pro/register" className="bg-accent text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-accent/20 font-bold text-sm">
                  Join Now
                </Link>
              </div>

            )}

          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in fade-in slide-in-from-top-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary font-medium">Home</Link>
          <Link href="/professionals" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary font-medium">Professionals</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary font-medium">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary font-medium">Contact</Link>
          {session ? (
            <button onClick={() => signOut()} className="block w-full text-left text-red-500 font-bold px-2 py-2">Logout</button>
          ) : (
            <div className="flex flex-col gap-4 pt-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="border-2 border-primary text-primary text-center px-5 py-3 rounded-xl font-bold">
                Sign In
              </Link>
              <Link href="/pro/register" onClick={() => setIsOpen(false)} className="bg-accent text-white text-center px-5 py-3 rounded-xl font-bold">
                Join Now
              </Link>
            </div>

          )}

        </div>
      )}
    </nav>
  );
}

