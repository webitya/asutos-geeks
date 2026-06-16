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
    { name: 'Professionals', path: '/admin/professionals', icon: '👨‍🔧' },
    { name: 'Contacts', path: '/admin/contacts', icon: '📩' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Wetawork</span>
            <span className="text-xl font-bold text-accent">Geeks</span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1 block">Admin Control</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                pathname === item.path 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <Link 
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
          >
            <span>🌐</span> View Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-foreground capitalize">
            {pathname.split('/').pop()}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-500">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
