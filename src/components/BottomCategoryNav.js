'use client';
import Link from 'next/link';

export default function BottomCategoryNav() {
  const items = [
    {
      label: "Finance",
      href: "/professionals?category=Finance%20%26%20Accounting",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Legal",
      href: "/professionals?category=Legal",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      label: "Video",
      href: "/professionals?category=Video%20%26%20Film",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Design",
      href: "/professionals?category=Graphics%20%26%20Design",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 md:hidden w-full">
      <div className="bg-white/95 backdrop-blur-xl border-t border-purple-100 rounded-t-[2rem] p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] grid grid-cols-2 gap-y-4 gap-x-2">
        {items.map((item, index) => (
          <Link key={index} href={item.href} className="flex flex-col items-center gap-1.5 group">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center border border-purple-100 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
              {item.icon}
            </div>
            <span className="text-[9px] font-normal uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors text-center">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
