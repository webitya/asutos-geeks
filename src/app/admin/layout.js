'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If we are not on the login page, check for token
    if (pathname !== '/admin/login') {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(true); // Allow login page
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!isAuthorized) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Categories', path: '/admin/categories', icon: '🗂️' },
    { name: 'Professionals', path: '/admin/professionals', icon: '👨‍🔧' },
    { name: 'Contacts', path: '/admin/contacts', icon: '📩' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm shrink-0 h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col items-start justify-center h-16 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-black text-primary">Wetawork</span>
          </Link>
          <span className="text-[9px] uppercase tracking-widest font-bold text-accent mt-0.5 block">Admin Control</span>
        </div>
        
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                pathname === item.path 
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 flex flex-col gap-1 shrink-0">
          <Link 
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-primary transition-all"
          >
            <span className="text-base">🌐</span> View Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <span className="text-base">🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50 relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <h2 className="font-black text-foreground capitalize text-lg">
            {pathname.split('/').pop()}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500">Admin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-sm">
              W
            </div>
          </div>
        </header>
        
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
